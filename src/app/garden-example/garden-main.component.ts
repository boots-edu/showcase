import html from "./garden-main.component.html";
import css from "./garden-main.component.css";
import { EzComponent } from "@gsilber/webez";
import { GardenComponent } from "./garden/garden.component";
import { DisplayCaseComponent } from "./display-case/display-case.component";
import { PlantComponent } from "./plant/plant.component";

/**
 * @description GardenMainComponent is the main component of the app
 * @extends EzComponent
 *
 */
export class GardenMainComponent extends EzComponent {
    constructor() {
        super(html, css);

        const garden = new GardenComponent();
        this.addComponent(garden, "garden");
        const displayCase = new DisplayCaseComponent();
        this.addComponent(displayCase, "display-case");

        garden.gatherEvent.subscribe((plants: PlantComponent[]) => {
            displayCase.addPlants(plants);
        });
    }
}
