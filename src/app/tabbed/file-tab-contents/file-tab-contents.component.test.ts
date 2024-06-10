import { describe, expect, test, beforeAll } from "@jest/globals";
import { FileTabContentsComponent } from "./file-tab-contents.component";
import { bootstrap } from "@gsilber/webez";

describe("FileTabContentsComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<FileTabContentsComponent>(FileTabContentsComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(FileTabContentsComponent);
        });
    });
});
