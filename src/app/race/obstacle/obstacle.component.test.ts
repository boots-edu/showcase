import { describe, expect, test, beforeAll } from "@jest/globals";
import { ObstacleComponent } from "./obstacle.component";
import { bootstrap } from "@gsilber/webez";

describe("ObstacleComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<ObstacleComponent>(ObstacleComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(ObstacleComponent);
        });
    });
});
