import * as PIXI from 'pixi.js'
import {Board} from "./board";

class Main {
    private config = {
        activeKey: "1",
        colorKey: 0x85c7f2
    };

    private readonly app: PIXI.Application;

    private keyPressEvent({charCode, key}: KeyboardEvent) {
        if (charCode >= 49 && charCode <= 54 || charCode == 32) {
            if (charCode === 32) {
                if (this.config.colorKey == 0xf28590) {
                    this.config.colorKey = 0x85c7f2;
                    return;
                }

                this.config.colorKey = 0xf28590;
                return;
            }

            this.config.activeKey = key;
        }
    }

    constructor() {
        document.body.onkeypress = this.keyPressEvent.bind(this);

        this.app = new PIXI.Application({
            backgroundColor: 0xFFFFFF,
            antialias: true,
            width: window.innerWidth,
            height: window.innerHeight,
        });
        document.body.appendChild(this.app.view);

        this.createBoard();

        this.app.ticker.add(this.animationLoop.bind(this));
    }

    private animationLoop(delta: number) {
        // circle.position.x += delta * 0.3;
    }

    private createBoard() {
        const board = Board.generate(this.app);

        this.app.stage.addChild(board);
    }
}

new Main();
