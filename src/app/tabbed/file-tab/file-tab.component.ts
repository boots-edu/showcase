import {
    BindCSSClassToBoolean,
    BindAttribute,
    BindValue,
    Click,
    WebzComponent,
    Notifier,
} from "@boots-edu/webz";
import html from "./file-tab.component.html";
import css from "./file-tab.component.css";

const ALL_CAPS = new Set(["html", "ts", "css", "json"]);

function titleCase(title: string): string {
    if (ALL_CAPS.has(title)) {
        return title.toUpperCase();
    }
    if (!title) {
        return "";
    }
    return title[0].toUpperCase() + title.slice(1);
}

export class FileTabComponent extends WebzComponent {
    @BindValue("title", titleCase)
    @BindValue("title-text", titleCase)
    private title: string = "";

    @BindCSSClassToBoolean("title", "active")
    @BindAttribute("title", "aria-current", (active: boolean) =>
        active ? "true" : "false",
    )
    private active: boolean = false;

    changeTabEvent: Notifier<FileTabComponent> = new Notifier();

    constructor(title: string) {
        super(html, css);
        this.title = title;
    }

    @Click("title")
    setActive() {
        const wasChanged = this.activate();
        if (wasChanged) {
            this.changeTabEvent.next(this);
        }
    }

    deactivate(): boolean {
        const oldValue = this.active;
        this.active = false;
        return oldValue !== this.active;
    }

    activate(): boolean {
        const oldValue = this.active;
        this.active = true;
        return oldValue !== this.active;
    }

    getTitle() {
        return this.title;
    }
}
