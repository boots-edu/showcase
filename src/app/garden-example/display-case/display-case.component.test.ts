import { describe, expect, test, beforeAll } from "@jest/globals";
import { DisplayCaseComponent } from "./display-case.component";
import { bootstrap } from "@gsilber/webez";

describe("DisplayCaseComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<DisplayCaseComponent>(DisplayCaseComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(DisplayCaseComponent);
        });
    });
});
