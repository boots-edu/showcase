import {
    BindAttribute,
    BindValue,
    Change,
    Click,
    WebzComponent,
    ValueEvent,
} from "@boots-edu/webz";
import html from "./tabbed.component.html";
import css from "./tabbed.component.css";
import { FileTabComponent } from "./file-tab/file-tab.component";
import { FileTabContentsComponent } from "./file-tab-contents/file-tab-contents.component";
import marked from "marked";

/*
Tabbed component
	Div of file tab array
	file tab contents
		div of file-row
*/

export type TabBy = "extension" | "component";

export function groupFiles(
    files: Record<string, string>,
    by: TabBy,
): Record<string, Record<string, string>> {
    const grouped: Record<string, Record<string, string>> = {};
    for (const [filename, contents] of Object.entries(files)) {
        const component = filename.split(".").shift() || "";
        const extension = filename.split(".").pop() || "";
        const outerGroup = by === "extension" ? extension : component;
        if (!(outerGroup in grouped)) {
            grouped[outerGroup] = {};
        }
        grouped[outerGroup][filename] = contents;
    }
    return grouped;
}

export class TabbedComponent extends WebzComponent {
    @BindAttribute("title-target", "id")
    @BindValue("title")
    private title: string = "";

    private innerComponent: WebzComponent;
    private innerComponentCreator: () => WebzComponent;
    private files: Record<string, string>;

    private tabs: FileTabComponent[] = [];
    private panes: FileTabContentsComponent[] = [];

    private activeTab: string = "";

    private showTests: boolean = false;

    private tabBy: TabBy = "component";

    @BindValue("readme", (readme: string) => marked.parse(readme) as string)
    private readme: string = "No readme file found";

    constructor(
        innerComponentCreator: () => WebzComponent,
        files: Record<string, string>,
    ) {
        super(html, css);

        this.innerComponentCreator = innerComponentCreator;
        this.innerComponent = innerComponentCreator();
        this.addComponent(this.innerComponent, "contents");
        this.files = files;
        this.title = this.innerComponent.constructor.name;

        this.loadInFiles();
    }

    loadInFiles() {
        let files = this.files;
        files = Object.entries(files).reduce(
            (acc: Record<string, string>, [filename, contents]) => {
                if (filename.toLowerCase() === "readme.md") {
                    // Find the readme.md file if it exists
                    this.readme = contents;
                } else if (this.showTests || !filename.endsWith(".test.ts")) {
                    // Only include files that are not test files
                    acc[filename] = contents;
                }
                return acc;
            },
            {},
        );

        const groupedFiles = groupFiles(files, this.tabBy);

        Object.entries(groupedFiles).forEach(([grouper, files]) => {
            this.addTab(grouper, files);
        });
    }

    addTab(title: string, files: Record<string, string>) {
        // Create the pane
        const pane = new FileTabContentsComponent(title, files);
        this.addComponent(pane, "files-contents");
        this.panes.push(pane);

        // Create the tab
        const tab = new FileTabComponent(title);
        this.addComponent(tab, "files-tabs");
        // Activate the first tab
        if (!this.tabs.length) {
            tab.activate();
            pane.show();
            this.activeTab = tab.getTitle();
        }
        this.tabs.push(tab);
        // When the tab is clicked, deactivate all other tabs and activate this one
        tab.changeTabEvent.subscribe((tab) => {
            this.activateTab(tab.getTitle());
        });
    }

    reset() {
        this.removeComponent(this.innerComponent);
        this.innerComponent = this.innerComponentCreator();
        this.addComponent(this.innerComponent);
    }

    @Click("switch-grouping")
    switchGrouping() {
        this.tabBy = this.tabBy === "component" ? "extension" : "component";
        this.clearFiles();
        this.loadInFiles();
    }

    clearFiles() {
        this.tabs
            .splice(0, this.tabs.length)
            .forEach((tab) => this.removeComponent(tab));
        this.panes.splice(0, this.panes.length).forEach((pane) => {
            pane.clearTabContents();
            this.removeComponent(pane);
        });
    }

    getTitle() {
        return this.title;
    }

    scrollInToView() {
        this["htmlElement"].scrollIntoView();
    }

    @Change("show-tests")
    setShowTests(event: ValueEvent) {
        this.showTests = event.value === "on";
        const oldActiveTab = this.activeTab;
        this.clearFiles();
        this.loadInFiles();
        const newActiveTab = this.activateTab(oldActiveTab);
        newActiveTab.activate();
    }

    activateTab(title: string): FileTabComponent {
        this.activeTab = title;
        // Deactivate all other tabs
        this.tabs.forEach((otherTab: FileTabComponent) => {
            if (otherTab.getTitle() !== title) {
                otherTab.deactivate();
            }
        });
        // Hide the other panes, show this pane
        this.panes.forEach((otherPane: FileTabContentsComponent) => {
            otherPane.setVisible(otherPane.getTitle() === title);
        });
        // Return the active tab
        const newTab = this.tabs.find((tab) => tab.getTitle() === title);
        if (!newTab) {
            throw new Error(`No tab with title ${title}`);
        }
        return newTab;
    }
}
