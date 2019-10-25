import {Graphics} from "pixi.js";
import * as PIXI from "pixi.js";

export namespace Hexagon {
    const config = {
        hexRadius: 40,
        hexHeight: 25,
        sideLength: 40,
        hexRectangleHeight: 40 + 2 * 25,
        hexRectangleWidth: 2 * 40,
    };

    export function create(positionX: number, positionY: number) {
        const x = 0, y = 0;

        const shape = new Graphics();
        shape.lineStyle(4, 0xeaedec);
        shape.moveTo(x + config.hexRadius, y);
        shape.lineTo(x + config.hexRectangleWidth, y + config.hexHeight);
        shape.lineTo(x + config.hexRectangleWidth, y + config.hexHeight + config.sideLength);
        shape.lineTo(x + config.hexRadius, y + config.hexRectangleHeight);
        shape.lineTo(x, y + config.sideLength + config.hexHeight);
        shape.lineTo(x, y + config.hexHeight);
        shape.lineTo(x + config.hexRadius, y);
        shape.tint = 0xeaedec;

        //
        shape.interactive = true;
        shape.hitArea = new PIXI.Polygon([
            new PIXI.Point(x + config.hexRadius, y),
            new PIXI.Point(x + config.hexRectangleWidth, y + config.hexHeight),
            new PIXI.Point(x + config.hexRectangleWidth, y + config.hexHeight + config.sideLength),
            new PIXI.Point(x + config.hexRadius, y + config.hexRectangleHeight),
            new PIXI.Point(x, y + config.sideLength + config.hexHeight),
            new PIXI.Point(x, y + config.hexHeight),
            new PIXI.Point(x + config.hexRadius, y),
        ]);

        // Should have two different hexes, one inside the other, with the outer hex being transparent "margin"


        shape.pivot.set(shape.width / 2, shape.height / 2);
        shape.position.set(x, y);

        // TODO: Events
        // shape.on('pointerover', function (event) {
        //     if (shape.tint !== 8767474 && !shape.children.length) {
        //         shape.tint = 0xcccccc;
        //     }
        // });
        //
        // shape.on('mousedown', (event) => {
        //     if (!shape.children.length) {
        //         const player = shape.clone();
        //         player.tint = this.colorKey;
        //         player.scale.set(0.7);
        //         player.position.x += 12.5;
        //         player.position.y += 13;
        //
        //         // player.fill.color =  0x000000;
        //         player.fill.alpha = 1;
        //
        //         shape.addChild(player);
        //
        //
        //         const number = new PIXI.Text(this.activeKey || "", {
        //             fontSize: 26,
        //             fontWeight: 'bold',
        //             fill: player.tint
        //         });
        //         number.tint = player.tint;
        //
        //         number.pivot.set(number.width / 2, number.height / 2);
        //         number.position.set(player.position.x + 28, player.position.y + 30);
        //
        //         shape.addChild(number);
        //
        //         shape.tint = player.tint;
        //
        //         return
        //     }
        //
        //     shape.tint = 0xcccccc;
        //
        //     for (const index in shape.children) {
        //         shape.children[index].destroy();
        //         shape.children.splice(Number(index), 1);
        //     }
        // });
        //
        // shape.on('pointerout', function (event) {
        //     if (shape.tint !== 8767474 && !shape.children.length) {
        //         shape.tint = 0xeaedec;
        //     }
        // });

        return shape;
    }
}
