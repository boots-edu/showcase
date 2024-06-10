import { Click, Notifier, WebzComponent } from "@boots-edu/webz";
import html from "./garden.component.html";
import css from "./garden.component.css";
import { PlantComponent } from "../plant/plant.component";

export class GardenComponent extends WebzComponent {
    private plants: PlantComponent[] = [];
    private latestId = 0;

    gatherEvent: Notifier<PlantComponent[]> = new Notifier();

    constructor() {
        super(html, css);
    }
    @Click("add-plant")
    addPlant() {
        const newPlant = new PlantComponent(this.latestId);
        this.addComponent(newPlant, "plants");
        this.plants.push(newPlant);
        this.latestId += 1;
        newPlant.removeEvent.subscribe((id: number) => {
            this.removePlant(id);
        });
    }

    removePlant(target: number) {
        for (let i = 0; i < this.plants.length; i += 1) {
            if (this.plants[i].getId() === target) {
                const removedElements = this.plants.splice(i, 1);
                for (let e of removedElements) {
                    this.removeComponent(e);
                }
            }
        }
    }

    @Click("gather")
    onGather() {
        const removed = this.plants.splice(0, this.plants.length);
        this.gatherEvent.next(removed);
    }
}
