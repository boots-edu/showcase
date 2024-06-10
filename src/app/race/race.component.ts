import html from "./race.component.html";
import css from "./race.component.css";
import {
    BindStyleToNumber,
    BindValue,
    Click,
    EzComponent,
    EzDialog,
    Timer,
    WindowEvent,
} from "@gsilber/webez";
import { ObstacleComponent } from "./obstacle/obstacle.component";

/**
 * @description MainComponent is the main component of the app
 * @extends EzComponent
 *
 */
export class RaceComponent extends EzComponent {
    private running: boolean = true;
    private speed: number = 10;
    private topLane: number = 10;
    private bottomLane: number = 90;
    @BindValue("score", (value: number) => `Score: ${value.toString()} `)
    private score: number = 0;
    @BindValue("clock")
    private clock: string = "00:00";
    private startTime: Date = new Date();

    @BindStyleToNumber("car", "top", "px")
    private top: number = this.topLane;

    @BindStyleToNumber("car", "left", "%")
    private left: number = 100;

    obstracles: ObstacleComponent[] = [];
    constructor() {
        super(html, css);
        this.resetGame();
    }

    /**
     * @description resetGame:Restart the game and reset position and score
     * @returns {void}
     */
    resetGame() {
        this.removeObstacles();
        this.addObstacles();
        this.left = 100;
        this.speed = 5;
        this.score = 0;
        this.clock = "00:00";
        this.top = this.topLane;
        this.startTime = new Date();
        this.running = false;
    }
    /**
     * @description removeObstacles is a method that removes all obstacles from the road
     * @returns {void}
     */
    removeObstacles() {
        this.obstracles.forEach((obs) => {
            this.removeComponent(obs);
        });
        this.obstracles = [];
    }

    /**
     * @description addObstacles is a method that adds obstacles to the road
     * @returns {void}
     */
    addObstacles(): void {
        const GAP = 50;
        let col = Math.floor(Math.random() * GAP + 10);
        let col2 = Math.floor(Math.random() * GAP + 10);
        let obs = new ObstacleComponent(10, col);
        this.obstracles.push(obs);
        this.addComponent(obs, "road");
        obs = new ObstacleComponent(90, col2);
        this.obstracles.push(obs);
        this.addComponent(obs, "road");
    }

    /**
     * @description hitTest is a method that checks if the car has hit an obstacle
     * @returns {boolean} - true if the car has hit an obstacle, false otherwise
     */
    hitTest(): boolean {
        // the car is in a box that has a left margin of 50, a top margin of 30 within the car and has a height of 90 and a width of 180
        // the obstacles are at this.obstracles[i].x and this.obstacles[i].y  The obstacles are 70x100
        let estimatedCarWidthPercent = 10;
        let estimatedBumperWidthPercent = 1;
        for (let i = 0; i < this.obstracles.length; i++) {
            let obs = this.obstracles[i];
            if (
                this.left > obs.x - estimatedCarWidthPercent &&
                this.left < obs.x + estimatedBumperWidthPercent &&
                this.top == obs.y
            ) {
                return true;
            }
        }

        return false;
    }

    /**
     * @description updateTime is a method that updates the clock based on actual time elapsed
     * @returns {void}
     */
    updateTime() {
        let now = new Date();
        let diff = now.getTime() - this.startTime.getTime();
        let minutes = Math.floor(diff / 60000);
        let seconds = Math.floor((diff - minutes * 60000) / 1000);
        this.clock = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    /**
     * @description Timer method executes periodically (100ms)
     * @param cancel {() => void} - a function that can be called to cancel the timer
     * @returns {void}
     */
    @Timer(50)
    onTimerTick(): void {
        if (!this.running) return;
        this.left -= this.speed;
        this.updateTime();
        this.score = this.score + this.speed * this.speed;
        if (this.left < -20) {
            this.removeObstacles();
            this.addObstacles();
            this.left = 100;
        }
        if (this.hitTest()) {
            this.running = false;
            EzDialog.popup(this, "You Crashed!", "Game Over").subscribe(() => {
                this.resetGame();
            });
        }
    }
    /**
     * @description onKeydown is a method that listens for keydown events
     * For anytime you need a keypress this is how you do it.
     * @param event {KeyboardEvent} - the event that was triggered
     * @returns {void}
     */
    @WindowEvent("keydown")
    onKeydown(event: KeyboardEvent) {
        if (event.key === "ArrowUp") {
            this.top = this.topLane;
        } else if (event.key === "ArrowDown") {
            this.top = this.bottomLane;
        } else if (event.key === "ArrowLeft") {
            if (this.speed < 10) this.speed += 1;
        } else if (event.key === "ArrowRight") {
            if (this.speed > -10) this.speed -= 1;
        }
    }

    @Click("start")
    start() {
        this.running = true;
    }
}
