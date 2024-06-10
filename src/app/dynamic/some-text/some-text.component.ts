import { BindValue, Click, WebzComponent } from "@boots-edu/webz";
import html from "./some-text.component.html";
import css from "./some-text.component.css";

export class SomeTextComponent extends WebzComponent {
    // Changing textValue will change the text in the element with the id "text"
    @BindValue("text")
    private textValue: string = "Click me!";

    constructor() {
        super(html, css);
    }

    // Clicking the element with the id "text" will change the text to a different value
    @Click("text")
    onTextClicked() {
        this.textValue = "You clicked the text!";
    }
}
