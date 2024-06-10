import { BindVisibleToBoolean, WebzComponent } from "@boots-edu/webz";
import html from "./file-tab-contents.component.html";
import css from "./file-tab-contents.component.css";
import { FileRowComponent } from "../file-row/file-row.component";

export class FileTabContentsComponent extends WebzComponent {
    private files: Record<string, string>;
    private tabContents: FileRowComponent[] = [];
    private title: string;

    @BindVisibleToBoolean("tab-contents")
    private visible: boolean = false;

    constructor(title: string, files: Record<string, string>) {
        super(html, css);
        this.title = title;
        this.files = files;
        for (const [filename, contents] of Object.entries(files)) {
            this.addFile(filename, contents);
        }
    }

    addPane(files: Record<string, string>) {
        Object.entries(files).forEach(([filename, contents]) => {
            if (contents.length) {
                this.addFile(filename, contents);
            }
        });
    }

    addFile(filename: string, contents: string) {
        if (contents.length > 0) {
            const newRow = new FileRowComponent(filename, contents);
            this.tabContents.push(newRow);
            this.addComponent(newRow, "tab-contents");
            newRow.toggleExpanded();
        }
    }

    clearTabContents() {
        this.tabContents.splice(0, this.tabContents.length).forEach((row) => {
            this.removeComponent(row);
        });
    }

    show() {
        this.visible = true;
    }
    hide() {
        this.visible = false;
    }
    setVisible(visible: boolean) {
        this.visible = visible;
    }

    getTitle() {
        return this.title;
    }
}
