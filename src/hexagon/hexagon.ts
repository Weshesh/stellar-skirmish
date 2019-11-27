import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";
import { globalConstants } from '../values/globalConstants';
import { globalVariables } from '../values/globalVariables';

export namespace Hexagon {
    export const config = {
        //TODO: name correctly, consistently with geometrical values
        xStep: 34.64,
        yStep: 20,
        side: 40,
        hexagonDiameter: 40,
        circleStart: Math.PI * 2 / 6,
        sineStep: Math.PI / 3,
        fullCircle: Math.PI * 2,
    };

    function coordinatesGenerator() {
        let coordinates = [], xStart = 0, yStart = 0;
        for (let index = config.circleStart; index <= config.fullCircle + config.sineStep; index += config.sineStep) {
            xStart += Math.sin(index) * 40;
            yStart += Math.cos(index + Math.PI) * 40;
            coordinates.push({
                x: xStart,
                y: yStart,
            })
        }
        return coordinates;
    };

    export function create(positionX: number, positionY: number) {
        let x = 0, y = 0;
        const shape = new Graphics();
        shape.lineStyle(4, 0xeaedec);
        coordinatesGenerator().forEach(element =>
        shape.lineTo(element.x, element.y));
        shape.tint = globalConstants.colors.grey;
        shape.interactive = true;

        shape.hitArea = new PIXI.Polygon([]);
/*         shape.hitArea.push(coordinatesGenerator().map(element =>
            new PIXI.Point(element.x, element.y);
        ); */

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
                number.position.set(player.position.x, player.position.y);

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
