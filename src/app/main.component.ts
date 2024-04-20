import html from "./main.component.html";
import css from "./main.component.css";
import { EzComponent } from "@gsilber/webez";
import { TabbedComponent } from "./tabbed/tabbed.component";
import { JokeComponent } from "./joke/joke.component";

import FILES from "./components.json";
import { JumpLinkComponent } from "./jump-link/jump-link.component";

const FILES_AS_RECORD = FILES as Record<string, Record<string, string>>;

function getFiles(...names: string[]): Record<string, string> {
    const files: Record<string, string> = {};
    for (const groupName of names) {
        for (const name in FILES_AS_RECORD[groupName]) {
            files[name] = FILES_AS_RECORD[groupName][name];
        }
    }
    return files;
}

/**
 * @description MainComponent is the main component of the app
 * @extends EzComponent
 *
 */
export class MainComponent extends EzComponent {
    private tabs: TabbedComponent[] = [];

    constructor() {
        super(html, css);

        this.tabs.push(
            new TabbedComponent(() => new JokeComponent(), getFiles("joke")),
        );
        this.finishLoadingTabs();
    }

    finishLoadingTabs() {
        for (const tab of this.tabs) {
            this.addComponent(tab, "tabs");
            const jumper = new JumpLinkComponent(
                tab.getTitle(),
                `#${tab.getTitle()}`,
            );
            this.addComponent(jumper, "table-of-contents");
            jumper.jumpEvent.subscribe(() => {
                tab.scrollInToView();
            });
        }
    }
}
