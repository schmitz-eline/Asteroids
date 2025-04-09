export class KeyController {
    public currentKeys: string[] = [];
    private allowedKeys: string[];
    private runWhenStart: () => void;
    private isStarted: boolean = false;

    constructor(allowedKeys: string[], runWhenStart: () => void) {
        this.allowedKeys = allowedKeys;
        this.runWhenStart = runWhenStart;
        window.addEventListener('keydown', (evt) => {
            this.keyDown(evt);
        });
        window.addEventListener('keyup', (evt) => {
            this.keyUp(evt);
        });
    }

    private keyDown(evt: KeyboardEvent) {
        if (this.allowedKeys.includes(evt.key)) {
            if (!this.isStarted) {
                this.isStarted = true;
                this.runWhenStart();
            }
            if (this.currentKeys.indexOf(evt.key) === -1) {
                this.currentKeys.push(evt.key);
            }
        }
    }

    private keyUp(evt: KeyboardEvent) {
        if (this.allowedKeys.includes(evt.key)) {
            this.currentKeys.splice(this.currentKeys.indexOf(evt.key), 1)
        }
    }
}