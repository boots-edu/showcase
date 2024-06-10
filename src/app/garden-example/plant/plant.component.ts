import {
    BindAttribute,
    BindValue,
    Click,
    EventSubject,
    EzComponent,
} from "@gsilber/webez";
import html from "./plant.component.html";
import css from "./plant.component.css";

const FLOWERS = ["🌱", "🌹", "🌷", "🌼", "🌺", "🌻"];

function makeFlower(): string {
    return FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
}

export class PlantComponent extends EzComponent {
    @BindValue("pic")
    private picture: string = makeFlower();

    @BindAttribute("pic", "title", (id: number) => id.toString())
    private id: number;

    removeEvent: EventSubject<number> = new EventSubject<number>();

    constructor(id: number) {
        super(html, css);
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    @Click("pic")
    onPicClicked() {
        this.removeEvent.next(this.id);
    }
}
