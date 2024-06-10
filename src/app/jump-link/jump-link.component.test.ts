import { describe, expect, test, beforeAll } from "@jest/globals";
import { JumpLinkComponent } from "./jump-link.component";
import { bootstrap } from "@boots-edu/webz";

describe("JumpLinkComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<JumpLinkComponent>(JumpLinkComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(JumpLinkComponent);
        });
    });
});
