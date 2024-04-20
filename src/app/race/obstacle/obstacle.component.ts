import {
    BindStyleToNumber,
    BindStyleToNumberAppendPx,
    EzComponent,
} from "@gsilber/webez";
import html from "./obstacle.component.html";
import css from "./obstacle.component.css";

export class ObstacleComponent extends EzComponent {
    @BindStyleToNumberAppendPx("cone", "top")
    y: number;
    @BindStyleToNumber("cone", "left", "%")
    x: number;
    constructor(y: number, x: number) {
        super(html, css);
        this.x = x;
        this.y = y;
    }
}
