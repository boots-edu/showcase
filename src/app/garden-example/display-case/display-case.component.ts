import { EzComponent } from "@gsilber/webez";
import html from "./display-case.component.html";
import css from "./display-case.component.css";
import { DisplayRowComponent } from "../display-row/display-row.component";
import { PlantComponent } from "../plant/plant.component";

export class DisplayCaseComponent extends EzComponent {
    private rows: DisplayRowComponent[] = [];
    constructor() {
        super(html, css);
    }

    addPlants(plants: PlantComponent[]) {
        const row = new DisplayRowComponent(plants);
        this.addComponent(row);
        this.rows.push(row);
    }
}
