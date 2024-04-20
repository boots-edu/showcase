import { BindValue, Click, EventSubject, EzComponent } from "@gsilber/webez";
import html from "./jump-link.component.html";
import css from "./jump-link.component.css";

export class JumpLinkComponent extends EzComponent {
    @BindValue("jump")
    private name: string;
    private target: string;

    jumpEvent: EventSubject<JumpLinkComponent> = new EventSubject();

    constructor(name: string, target: string) {
        super(html, css);
        this.name = name;
        this.target = target;
    }

    @Click("jump")
    jump() {
        this.jumpEvent.next(this);
    }

    getTarget() {
        return this.target;
    }
}
