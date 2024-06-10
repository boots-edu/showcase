import {
    BindAttribute,
    BindValue,
    Click,
    Notifier,
    WebzComponent,
} from "@boots-edu/webz";
import html from "./plant.component.html";
import css from "./plant.component.css";

const FLOWERS = ["🌱", "🌹", "🌷", "🌼", "🌺", "🌻"];

function makeFlower(): string {
    return FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
}

export class PlantComponent extends WebzComponent {
    @BindValue("pic")
    private picture: string = makeFlower();

    @BindAttribute("pic", "title", (id: number) => id.toString())
    private id: number;

    removeEvent: Notifier<number> = new Notifier<number>();

    constructor(id: number) {
        super(html, css);
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    @Click("pic")
    onPicClicked() {
        this.removeEvent.notify(this.id);
    }
}
