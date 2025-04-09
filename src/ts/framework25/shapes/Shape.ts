import {iColor} from "../types/iColor";
import {Vector} from "../Vector";

export abstract class Shape {
    ctx: CanvasRenderingContext2D;
    position: Vector;
    color: iColor;


    protected constructor(ctx: CanvasRenderingContext2D, position: Vector, color: iColor) {
        this.ctx = ctx;
        this.position = position;
        this.color = color;
    }
}
