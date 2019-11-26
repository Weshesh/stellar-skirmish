import * as PIXI from "pixi.js";
import {Graphics} from "pixi.js";
import {globalConstants} from '../values/globalConstants';
import {globalVariables} from '../values/globalVariables';

export namespace Hexagon {
    export const config = {
        //TODO: name correctly, consistently with geometrical values
        xStep: 34.64,
        yStep: 20,
        side: 40,
    };

    export function create(positionX: number, positionY: number) {
        let x = 0, y = 0;

        const shape = new Graphics();
        shape.lineStyle(4, 0xeaedec);
        shape.moveTo(x, y - config.side)
        shape.lineTo(x + config.xStep, y - config.yStep);
        shape.lineTo(x + config.xStep, y + config.yStep);
        shape.lineTo(x, y + config.yStep * 2);
        shape.lineTo(x - config.xStep, y + config.yStep);
        shape.lineTo(x - config.xStep, y - config.yStep);
        shape.lineTo(x, y - config.side);
        shape.lineTo(x + config.xStep, y - config.yStep);
        /*
        	for(let i = 0; i <= 360; i+=60) {
                xCurrent = xInterval*sin(ideg); radians?
                yCurrent = yInterval*cos(ideg);
                shape.lineTo(xCurrent, yCurrent);
            }
        */
        shape.tint = globalConstants.colors.grey;

        shape.interactive = true;
        shape.hitArea = new PIXI.Polygon([
            new PIXI.Point(x + config.xStep, y - config.yStep),
            new PIXI.Point(x + config.xStep, y + config.yStep),
            new PIXI.Point(x, y + config.yStep * 2),
            new PIXI.Point(x - config.xStep, y + config.yStep),
            new PIXI.Point(x - config.xStep, y - config.yStep),
            new PIXI.Point(x, y - config.side),
            new PIXI.Point(x + config.xStep, y - config.yStep),
        ]);

        shape.pivot.set(shape.width / 2, shape.height / 2);
        shape.position.set(positionX, positionY);

        switch (shape.tint) {
            case globalConstants.colors.red:
                shape.tint = globalConstants.colors.redHighlight;
                break;
            case globalConstants.colors.blue:
                shape.tint = globalConstants.colors.blueHighlight;
                break;
            case globalConstants.colors.grey:
                break;

        }
        shape.on('pointerover', function (event) {
            if (!shape.children.length) {
                shape.tint = globalConstants.colors.greyHighlight;
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

            for (const index in shape.children) {

                shape.children[index].destroy();
                shape.children.splice(Number(index), 1);
            }

            shape.tint = globalConstants.colors.greyHighlight;
        });

        shape.on('pointerout', function (event) {
            switch (shape.tint) {
                case globalConstants.colors.red || globalConstants.colors.redHighlight:
                    shape.tint = globalConstants.colors.red;
                    break;
                case globalConstants.colors.blue || globalConstants.colors.blueHighlight:
                    shape.tint = globalConstants.colors.blue;
                    break;
                default:
                    if (!shape.children.length) {
                        shape.tint = globalConstants.colors.grey;
                    }


            }
        });

        return shape;
    }
}
