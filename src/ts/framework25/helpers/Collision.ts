import {iRectangle} from "../types/iRectangle";
import {iPosition} from "../types/iPosition";


export class Collision {
    static checkCollision(aTopX: number, aTopY: number, aBottomX: number, aBottomY: number,
                          bTopX: number, bTopY: number, bBottomX: number, bBottomY: number,): boolean {
        return !(
            aBottomX < bTopX ||
            aBottomY < bTopY ||
            aTopX > bBottomX ||
            aTopY > bBottomY);
    }

    static checkCollisionInterface(a: iRectangle, b: iRectangle): boolean {
        return !(
            a.position.x + a.width < b.position.x ||
            a.position.y + a.height < b.position.y ||
            a.position.x > b.position.x + b.width ||
            a.position.y > b.position.y + b.height);
    }

    static replaceOutOfBounds(rectangle: iRectangle, canvas: HTMLCanvasElement) {
        if (rectangle.position.y > canvas.height + rectangle.height) {
            rectangle.position.y = -rectangle.height;
        }
        if (rectangle.position.y < -rectangle.height) {
            rectangle.position.y = canvas.height + rectangle.height;
        }
        if (rectangle.position.x > canvas.width + rectangle.width) {
            rectangle.position.x = -rectangle.width;
        }
        if (rectangle.position.x < -rectangle.width) {
            rectangle.position.x = canvas.width + rectangle.width;
        }
    }

    static transformPoint(point: iPosition, position: iPosition, orientation: number): iPosition {
        const cosTheta = Math.cos(orientation);
        const sinTheta = Math.sin(orientation);
        const rotatedX = point.x * cosTheta - point.y * sinTheta;
        const rotatedY = point.x * sinTheta + point.y * cosTheta;
        return {x: position.x + rotatedX, y: position.y + rotatedY};
    }

    isPointInCircle(positionA: iPosition, positionB: iPosition, radius: number): boolean {
        return Math.sqrt(Math.pow(positionA.x - positionB.x, 2) + Math.pow(positionA.y - positionB.y, 2)) < radius;
    }

}
