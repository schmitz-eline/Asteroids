export class KeyController {
    public currentKeys: string[] = [];
    private allowedKeys: string[];
    private readonly runWhenStarted: () => void;
    private isStarted: boolean = false;

    constructor(allowedKeys: string[], runWhenStart: () => void) {
        this.allowedKeys = allowedKeys;
        this.runWhenStarted = runWhenStart;
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
                this.runWhenStarted();
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