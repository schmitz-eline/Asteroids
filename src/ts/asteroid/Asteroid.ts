import {iAnimatable} from "../framework25/types/iAnimatable";
import {Vector} from "../framework25/Vector";
import {randomFloat, randomInt} from "../framework25/helpers/random";
import {settings} from "./settings";
import {Collision} from "../framework25/helpers/Collision";
import {Rectangle} from "../framework25/shapes/Rectangle";
import {Animation} from "../framework25/Animation";
import {Bullet} from "./Bullet";
import {Ship} from "./Ship";
import {GameStatus} from "./GameStatus";

export class Asteroid extends Rectangle implements iAnimatable {
    private readonly canvas: HTMLCanvasElement;
    private readonly path: Path2D;
    private readonly direction: number;
    private readonly speedRotation: number;
    private readonly speed: Vector;
    private readonly acceleration: Vector;
    public shouldBeRemoved: boolean = false;
    private readonly animation: Animation;
    private readonly parent: Asteroid;
    private readonly ship: Ship;
    private readonly gameStatus: GameStatus;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, animation: Animation, ship: Ship, gameStatus: GameStatus, parent: Asteroid = null) {
        super(ctx, new Vector({
            x: randomInt(settings.asteroid.size / 2, canvas.width - settings.asteroid.size / 2),
            y: randomInt(settings.asteroid.size / 2, canvas.height - settings.asteroid.size / 2),
        }), settings.asteroid.color, settings.asteroid.size, settings.asteroid.size);
        this.canvas = canvas;
        this.parent = parent;
        this.gameStatus = gameStatus;
        this.ship = ship;
        if (this.parent) {
            this.path = new Path2D(settings.asteroid.smallShapes[randomInt(0, settings.asteroid.smallShapes.length - 1)]);
            this.position = new Vector(this.parent.position);
            this.speed = new Vector(this.parent.speed);

        } else {
            this.path = new Path2D(settings.asteroid.shapes[randomInt(0, settings.asteroid.shapes.length - 1)]);
            this.speedRotation = randomFloat(settings.asteroid.rotationSpeed.min, settings.asteroid.rotationSpeed.max);
            this.speed = new Vector({x: 0, y: 0});
        }
        this.direction = randomFloat(0, Math.PI * 2);
        this.acceleration = Vector.fromAngle(this.direction, randomInt(settings.asteroid.acceleration.min, settings.asteroid.acceleration.max));
        this.path.closePath();
        this.speed.add(this.acceleration);
        this.animation = animation;
    }

    animate(): void {
        this.position.add(this.speed);
        this.rotation += this.speedRotation;
        Collision.replaceOutOfBounds(this, this.canvas);
        if (this.gameStatus.isStarted) {
            this.checkCollisionWithBullets();
            this.checkCollisionWithShip();
        }
        this.draw();
    }

    public draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.rotation);
        this.ctx.translate(-settings.asteroid.size / 2, -settings.asteroid.size / 2);
        this.ctx.strokeStyle = this.color.toString();
        this.ctx.stroke(this.path);
        this.ctx.restore();
    }

    private checkCollisionWithBullets() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.rotation);
        this.ctx.translate(-settings.asteroid.size / 2, -settings.asteroid.size / 2);
        this.animation.iAnimatables.forEach(bullet => {
            if (bullet instanceof Bullet) {
                if (this.ctx.isPointInPath(this.path, bullet.position.x, bullet.position.y)) {
                    if (this.parent === null) {
                        for (let i = 0; i < settings.asteroid.newAsteroidsCount; i++) {
                            this.animation.registeriAnimatable(new Asteroid(this.ctx, this.canvas, this.animation, this.ship, this.gameStatus, this));
                        }
                    }
                    this.shouldBeRemoved = true;
                }
            }
        });
        this.ctx.restore();
    }

    private checkCollisionWithShip() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.rotation);
        this.ctx.translate(-settings.asteroid.size / 2, -settings.asteroid.size / 2);
        this.ship.points.forEach((point) => {
            const transformedPoint = Collision.transformPoint(point, this.ship.position, this.ship.rotation);
            if (this.ctx.isPointInPath(this.path, transformedPoint.x, transformedPoint.y)) {
                this.animation.stop();
            }
        });

        this.ctx.restore();
    }
}