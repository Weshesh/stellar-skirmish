import {Graphics} from "pixi.js";
import * as PIXI from "pixi.js";
import { globalVariables} from '.././globalVariables';

export namespace Hexagon {
    export const config = {
        //Correct geometrical values
        xStep: 34.64,
        yStep: 20,
        side: 40,

        //TODO: 

    };
    
    export function create(positionX: number, positionY: number) {
        let x = 0, y = 0;
        
        const shape = new Graphics();
        shape.lineStyle(4, 0xeaedec);
        
        shape.moveTo(x, y - config.side)
        shape.lineTo(x + config.xStep, y - config.yStep);
        shape.lineTo(x + config.xStep, y + config.yStep);
        shape.lineTo(x, y + config.yStep*2);
        shape.lineTo(x - config.xStep, y + config.yStep);
        shape.lineTo(x - config.xStep, y - config.yStep);
        shape.lineTo(x, y - config.side);
        shape.lineTo(x + config.xStep, y - config.yStep);
        /*
        Could we use angles(like python turtle)? Ex: 
        for (let i = 1; i < 7; i++) {
            turn 60deg;
            go forth 20px;
        }
Cant find doc.

or something like
        	for(let i = 0; i <= 360; i+=60) {
                xCurrent = xInterval*sin(ideg); radians?
                yCurrent = yInterval*cos(ideg);
                shape.lineTo(xCurrent, yCurrent);
            }

        */
        shape.tint = 0xeaedec;
        
        shape.interactive = true;
        shape.hitArea = new PIXI.Polygon([
            new PIXI.Point(x + config.xStep, y - config.yStep),
            new PIXI.Point(x + config.xStep, y + config.yStep),
            new PIXI.Point(x, y + config.yStep*2),
            new PIXI.Point(x - config.xStep, y + config.yStep),
            new PIXI.Point(x - config.xStep, y - config.yStep),
            new PIXI.Point(x, y - config.side),
            new PIXI.Point(x + config.xStep, y - config.yStep),
        ]);
        
        shape.pivot.set(shape.width / 2, shape.height / 2);
        shape.position.set(positionX, positionY);
        
        shape.on('pointerover', function (event) {
            switch(shape.tint) {
                case 0xf28590:
                        shape.tint = 0xd97781;

                break;
                case 0x85c7f2:
                        shape.tint = 0x77b3d9;
                break;
                default:
                    shape.tint = 0xcccccc;
                    break;
            }
            if (shape.tint !== 8767474 && !shape.children.length) {
            }
        });
        
        shape.on('mousedown', (event) => {
            if (!shape.children.length) {
                const player = shape.clone();
                player.tint = globalVariables.getActiveColor();
                player.scale.set(0.7);
                player.position.x += 0;
                player.position.y += 0;                
                player.fill.color = globalVariables.getActiveColor();
                player.fill.alpha = 1;
                
                shape.addChild(player);
                
                
                const number = new PIXI.Text(globalVariables.getActiveKey() || "", {
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
            switch(shape.tint) {
                case 0xd97781:
                        shape.tint = 0xf28590;
                break;
                case 0x77b3d9:
                        shape.tint = 0x85c7f2;
                break;
                default:
                    shape.tint = 0xeaedec;
                    break;
            }
        });
        
        return shape;
    }
}
