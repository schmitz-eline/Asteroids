import {Circle} from "../framework25/shapes/Circle";
import {iAnimatable} from "../framework25/types/iAnimatable";
import {Vector} from "../framework25/Vector";
import {settings} from "./settings";
import {Ship} from "./Ship";

export class Bullet extends Circle implements iAnimatable {
    private readonly speed: Vector;
    private readonly acceleration: Vector;
    private readonly canvas: HTMLCanvasElement;
    public shouldBeRemoved: boolean = false;

    constructor(ctx: CanvasRenderingContext2D, ship: Ship, canvas: HTMLCanvasElement) {
        super(ctx, new Vector(ship.position), settings.bullet.color, settings.bullet.radius);
        this.speed = new Vector(ship.speed);
        this.acceleration = Vector.fromAngle(ship.rotation, settings.bullet.speed);
        this.speed.add(this.acceleration);
        this.canvas = canvas;
    }

    animate(): void {
        this.update();
        this.draw();
    }


    private update() {
        this.shouldBeRemoved = this.isOutOfCanvas();
        this.position.add(this.speed);
    }

    isOutOfCanvas() {
        return this.position.x > this.canvas.width + this.radius ||
            this.position.x < -this.radius ||
            this.position.y < -this.radius ||
            this.position.y > this.canvas.height + this.radius;

    }
}