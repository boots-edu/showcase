import { describe, expect, test, beforeAll } from "@jest/globals";
import { TabbedComponent } from "./tabbed.component";
import { bootstrap } from "@boots-edu/webz";

describe("TabbedComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<TabbedComponent>(TabbedComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(TabbedComponent);
        });
    });
});
