import {settings} from "./settings";
import {Ship} from "./Ship";
import {Animation} from "../framework25/Animation";
import {KeyController} from "../framework25/KeyController";
import {GameStatus} from "./GameStatus";
import {Asteroid} from "./Asteroid";

export class Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly ship: Ship;
    private readonly animation: Animation;
    private readonly keyController: KeyController;
    private readonly gameStatus: GameStatus;


    constructor() {
        this.canvas = document.getElementById(settings.canvas.id) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.resizeCanvas();
        this.gameStatus = new GameStatus();
        this.animation = new Animation(this.canvas, this.ctx);
        this.keyController = new KeyController(settings.keys, this.start.bind(this));
        this.ship = new Ship(this.ctx, this.canvas, this.keyController, this.animation);
        this.addEventListeners();
        this.animation.registeriAnimatable(this.ship);
        this.generateAsteroids();
        this.animation.start();
    }

    private generateAsteroids() {
        for (let i = 0; i < settings.asteroid.initialCount; i++) {
            this.animation.registeriAnimatable(new Asteroid(this.ctx, this.canvas, this.animation, this.ship, this.gameStatus));
        }
    }

    private addEventListeners() {
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    private resizeCanvas() {
        this.canvas.width = Math.min(window.innerWidth, window.innerHeight);
        this.canvas.height = Math.min(window.innerWidth, window.innerHeight);
    }

    public removeText() {
        document.querySelector(settings.h1.selector).classList.add(settings.h1.hideClass);
    }

    public start() {
        this.removeText();
        this.gameStatus.isStarted = true;
    }
}