import { BindVisibleToBoolean, Click, WebzComponent } from "@boots-edu/webz";
import html from "./joke.component.html";
import css from "./joke.component.css";

export class JokeComponent extends WebzComponent {
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
