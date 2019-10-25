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
        const board = Board.generate(this.app, this.getHexagon);

        this.app.stage.addChild(board);
    }
    
    getHexagon(positionX: number, positionY: number) {
        const x = 0, y = 0;
        
        const hexRadius = 40;
        const hexHeight = 25;
        const sideLength = 40;
        const hexRectangleHeight = sideLength + 2 * hexHeight;
        const hexRectangleWidth = 2 * hexRadius;
        
        const shape = new PIXI.Graphics();
        shape.lineStyle(4, 0xeaedec);
        shape.tint = 0xeaedec;
        shape.moveTo(x + hexRadius, y);
        shape.lineTo(x + hexRectangleWidth, y + hexHeight);
        shape.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        shape.lineTo(x + hexRadius, y + hexRectangleHeight);
        shape.lineTo(x, y + sideLength + hexHeight);
        shape.lineTo(x, y + hexHeight);
        shape.lineTo(x + hexRadius, y);
        //Should have two different hexes, one inside the other, with the outer hex being transparent "margin"
        //
        shape.pivot.set(shape.width / 2, shape.height / 2);
        shape.position.set(positionX, positionY);
        
        shape.interactive = true;
        shape.hitArea = new PIXI.Polygon([
            new PIXI.Point(x + hexRadius, y),
            new PIXI.Point(x + hexRectangleWidth, y + hexHeight),
            new PIXI.Point(x + hexRectangleWidth, y + hexHeight + sideLength),
            new PIXI.Point(x + hexRadius, y + hexRectangleHeight),
            new PIXI.Point(x, y + sideLength + hexHeight),
            new PIXI.Point(x, y + hexHeight),
            new PIXI.Point(x + hexRadius, y),
        ]);
        
        shape.on('pointerover', function (event) {
            if (shape.tint !== 8767474 && !shape.children.length) {
                shape.tint = 0xcccccc;
            }
        });
        
        shape.on('mousedown', (event) => {
            if (!shape.children.length) {
                const player = shape.clone();
                player.tint = this.colorKey;
                player.scale.set(0.7);
                player.position.x += 12.5;
                player.position.y += 13;
                
                // player.fill.color =  0x000000;
                player.fill.alpha = 1;
                
                shape.addChild(player);
                
                
                const number = new PIXI.Text(this.activeKey || "", {
                    fontSize: 26,
                    fontWeight: 'bold',
                    fill: player.tint
                });
                number.tint = player.tint;
                
                number.pivot.set(number.width / 2, number.height / 2);
                number.position.set(player.position.x + 28, player.position.y + 30);
                
                shape.addChild(number);
                
                shape.tint = player.tint;
                
                return
            }
            
            shape.tint = 0xcccccc;
            
            for (const index in shape.children) {
                shape.children[index].destroy();
                shape.children.splice(Number(index), 1);
            }
        });
        
        shape.on('pointerout', function (event) {
            if (shape.tint !== 8767474 && !shape.children.length) {
                shape.tint = 0xeaedec;
            }
        });
        
        return shape;
    }
}

new Main();

