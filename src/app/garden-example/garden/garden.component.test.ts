import { describe, expect, test, beforeAll } from "@jest/globals";
import { GardenComponent } from "./garden.component";
import { bootstrap } from "@gsilber/webez";

describe("GardenComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<GardenComponent>(GardenComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(GardenComponent);
        });
    });
});
