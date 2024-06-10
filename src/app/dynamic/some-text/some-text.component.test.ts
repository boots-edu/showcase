import { describe, expect, test, beforeAll } from "@jest/globals";
import { SomeTextComponent } from "./some-text.component";
import { bootstrap } from "@boots-edu/webz";

describe("SomeTextComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<SomeTextComponent>(SomeTextComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(SomeTextComponent);
        });
    });
});
