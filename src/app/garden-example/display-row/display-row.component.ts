import { EzComponent } from "@gsilber/webez";
import html from "./display-row.component.html";
import css from "./display-row.component.css";
import { PlantComponent } from "../plant/plant.component";

export class DisplayRowComponent extends EzComponent {
    constructor(plants: PlantComponent[]) {
        super(html, css);
        for (let plant of plants) {
            this.addComponent(plant, "plants");
        }
    }
}
