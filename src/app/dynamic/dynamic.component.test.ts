import { describe, expect, test, beforeAll } from "@jest/globals";
import { DynamicComponent } from "./dynamic.component";
import { bootstrap } from "@gsilber/webez";

describe("DynamicComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<DynamicComponent>(DynamicComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(DynamicComponent);
        });
    });
});
