import { BindValue, Click, Notifier, WebzComponent } from "@boots-edu/webz";
import html from "./jump-link.component.html";
import css from "./jump-link.component.css";

export class JumpLinkComponent extends WebzComponent {
    @BindValue("jump")
    private name: string;
    private target: string;

    jumpEvent: Notifier<JumpLinkComponent> = new Notifier();

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
