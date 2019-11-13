import {Graphics} from "pixi.js";
import * as PIXI from "pixi.js";

export namespace Hexagon {
    export const config = {
        hexRadius: 40,
        hexHeight: 20,
        sideLength: 40,
        hexRectangleHeight: 40 + 2 * 25,
        hexRectangleWidth: 2 * 40,

        //Correct geometrical values
        xStep: 34.64,
        yStep: 20,
        side: 40,
    };
    
    export function create(positionX: number, positionY: number) {
        let x = 0, y = 0;
        
        const shape = new Graphics();
        shape.lineStyle(4, 0xeaedec);
        shape.lineTo(x + config.xStep, y - config.yStep);
        shape.lineTo(x + config.xStep*2, y);
        shape.lineTo(x + config.xStep*2, y + config.side);
        shape.lineTo(x + config.xStep, y + config.side + config.yStep);
        shape.lineTo(x, y + config.side);
        shape.lineTo(x, y);
        shape.lineTo(x + config.xStep, y - config.yStep);





        shape.tint = 0xeaedec;
        
        //
        shape.interactive = true;
        shape.hitArea = new PIXI.Polygon([
            new PIXI.Point(x + config.xStep, y - config.yStep),
            new PIXI.Point(x + config.xStep*2, y),
            new PIXI.Point(x + config.xStep*2, y + config.side),
            new PIXI.Point(x + config.xStep, y + config.side + config.yStep),
            new PIXI.Point(x, y + config.side),
            new PIXI.Point(x, y),
            new PIXI.Point(x + config.xStep, y - config.yStep),
        ]);
        
        // Should have two different hexes, one inside the other, with the outer hex being transparent "margin"
        
        
        shape.pivot.set(shape.width / 2, shape.height / 2);
        shape.position.set(positionX, positionY);
        
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
