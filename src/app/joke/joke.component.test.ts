import { describe, expect, test, beforeAll } from "@jest/globals";
import { JokeComponent } from "./joke.component";
import { bootstrap } from "@gsilber/webez";

describe("JokeComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<JokeComponent>(JokeComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(JokeComponent);
        });
    });
});
