import {iAnimatable} from "./types/iAnimatable";
import {settings} from "./settings";

export class Animation {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public iAnimatables: iAnimatable[];
    private indexOfAnimatableThatShouldBeRemoved: number[] = [];
    private requestAnimationFrameID: number;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, animatables: iAnimatable[] = []) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.iAnimatables = animatables;
    }

    start() {
        this.animate();
    }

    stop() {
        cancelAnimationFrame(this.requestAnimationFrameID);
    }


    registeriAnimatable(animatable: iAnimatable) {
        this.iAnimatables.push(animatable);
    }

    private animate() {
        this.requestAnimationFrameID = requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.iAnimatables.length; i++) {
            if (this.iAnimatables[i].shouldBeRemoved) {
                if (!this.indexOfAnimatableThatShouldBeRemoved.includes(i)) {
                    this.indexOfAnimatableThatShouldBeRemoved.push(i);
                }
            }
            this.iAnimatables[i].animate();
        }

        if (this.indexOfAnimatableThatShouldBeRemoved.length > settings.maxUnnecessaryAnimatable) {
            for (let i = this.indexOfAnimatableThatShouldBeRemoved.length - 1; i >= 0; i--) {
                this.iAnimatables.splice(this.indexOfAnimatableThatShouldBeRemoved[i], 1);
            }
            this.indexOfAnimatableThatShouldBeRemoved = [];
        }

        console.log(this.iAnimatables.length);
    }

}