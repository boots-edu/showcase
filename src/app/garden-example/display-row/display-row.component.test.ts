import { describe, expect, test, beforeAll } from "@jest/globals";
import { DisplayRowComponent } from "./display-row.component";
import { bootstrap } from "@gsilber/webez";

describe("DisplayRowComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<DisplayRowComponent>(DisplayRowComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(DisplayRowComponent);
        });
    });
});
