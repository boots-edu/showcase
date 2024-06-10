import { describe, expect, test, beforeAll } from "@jest/globals";
import { FileRowComponent } from "./file-row.component";
import { bootstrap } from "@boots-edu/webz";

describe("FileRowComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<FileRowComponent>(FileRowComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(FileRowComponent);
        });
    });
});
