import { BindValue, Click, EzComponent } from "@gsilber/webez";
import html from "./dynamic.component.html";
import css from "./dynamic.component.css";
import { SomeTextComponent } from "./some-text/some-text.component";

export class DynamicComponent extends EzComponent {
    // Bind stringContent to the element with the id "bound-string"
    @BindValue("bound-string")
    private stringContent: string = "THE TEXT";

    constructor() {
        super(html, css);
    }

    // Clicking the element "add-to-string" will add more text to the stringContent
    @Click("add-to-string")
    addToString() {
        this.stringContent += " AND NOW MORE TEXT";
    }

    // Clicking the "bound-string" will reset the text to a different value
    @Click("bound-string")
    clickedBoundString() {
        this.stringContent = "YOU CLICKED SOMEWHERE ON THE BOUND STRING.";
    }

    // Clicking the "add-component" will add a new component to the "new-component-region"
    @Click("add-component")
    addSomeTextComponent() {
        const newSomeText = new SomeTextComponent();
        this.addComponent(newSomeText, "new-component-region");
    }
}
