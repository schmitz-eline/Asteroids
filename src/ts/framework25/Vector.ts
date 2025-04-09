import {iPosition} from "./types/iPosition";

export class Vector implements iPosition {
    x: number;
    y: number;

    constructor(position: iPosition) {
        this.x = position.x;
        this.y = position.y;
    }

    add(position: iPosition) {
        this.x += position.x;
        this.y += position.y;
    }

    subtract(position: iPosition) {
        this.x -= position.x;
        this.y -= position.y;
    }

    multiply(coefficient: number) {
        this.x *= coefficient;
        this.y *= coefficient;
    }

    static fromAngle(angle: number, length: number = 1): Vector {
        return new Vector({
            x: Math.cos(angle - Math.PI / 2) * length,
            y: Math.sin(angle - Math.PI / 2) * length,
        });
    }
}