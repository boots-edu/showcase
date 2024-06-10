import { describe, expect, test, beforeAll } from "@jest/globals";
import { PlantComponent } from "./plant.component";
import { bootstrap } from "@boots-edu/webz";

describe("PlantComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<PlantComponent>(PlantComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(PlantComponent);
        });
    });
});
