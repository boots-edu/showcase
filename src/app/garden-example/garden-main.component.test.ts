import { describe, expect, test, beforeAll } from "@jest/globals";
import { GardenMainComponent } from "./garden-main.component";
import { bootstrap } from "@boots-edu/webz";

describe("GardenMainComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<GardenMainComponent>(GardenMainComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(GardenMainComponent);
        });
    });
});
