import { describe, expect, test, beforeAll } from "@jest/globals";
import { FileTabComponent } from "./file-tab.component";
import { bootstrap } from "@gsilber/webez";

describe("FileTabComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<FileTabComponent>(FileTabComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(FileTabComponent);
        });
    });
});
