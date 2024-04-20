import { describe, expect, test, beforeAll } from "@jest/globals";
import { RaceComponent } from "./race.component";
import { bootstrap } from "@gsilber/webez";

describe("RaceComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<RaceComponent>(RaceComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(RaceComponent);
        });
    });
});
