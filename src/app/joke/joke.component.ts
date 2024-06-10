import { BindVisibleToBoolean, Click, EzComponent } from "@gsilber/webez";
import html from "./joke.component.html";
import css from "./joke.component.css";

export class JokeComponent extends EzComponent {
    @BindVisibleToBoolean("punchline")
    visible: boolean = false;

    constructor() {
        super(html, css);
    }

    @Click("reveal")
    reveal() {
        this.visible = !this.visible;
    }
}
