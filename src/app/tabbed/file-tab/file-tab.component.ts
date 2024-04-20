import {
    BindCSSClassToBoolean,
    BindAttribute,
    BindValue,
    Click,
    EzComponent,
    EventSubject,
} from "@gsilber/webez";
import html from "./file-tab.component.html";
import css from "./file-tab.component.css";

export class FileTabComponent extends EzComponent {
    @BindValue("title")
    private title: string = "";

    @BindCSSClassToBoolean("title", "active")
    @BindAttribute("title", "aria-current", (active: boolean) =>
        active ? "true" : "false",
    )
    private active: boolean = false;

    changeTabEvent: EventSubject<FileTabComponent> = new EventSubject();

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
