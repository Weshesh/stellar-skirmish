import * as PIXI from 'pixi.js'
import {Board} from "./board";

class Main {
    activeKey = "1";
    colorKey = 0x85c7f2;
    app: PIXI.Application;
    
    constructor() {
        document.body.onkeypress = ({charCode, key}) => {
            if (charCode >= 49 && charCode <= 54 || charCode == 32 ) {
                switch (charCode) {
                    case 32:
                    if (this.colorKey == 0xf28590) {
                        this.colorKey = 0x85c7f2;
                    }
                    else {
                        this.colorKey = 0xf28590;
                    }
                    break;
                    default:
                    this.activeKey = key;
                }
            }
        };
        
        this.app = new PIXI.Application({
            backgroundColor: 0xFFFFFF,
            antialias: true,
            width: window.innerWidth,
            height: window.innerHeight,
        });
        document.body.appendChild(this.app.view);
        
        this.createBoard();
        
        // Animation loop
        this.app.ticker.add((delta) => {
            // circle.position.x += delta * 0.3;
        });
    }
    
    private createBoard() {
        const board = Board.generate(this.app);
        
        this.app.stage.addChild(board);
    }
}

new Main();
