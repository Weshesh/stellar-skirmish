import * as PIXI from 'pixi.js'

class Main {
    activeKey = "1";
    app: PIXI.Application;

    constructor() {
        document.body.onkeypress = ({charCode, key}) => {
            if (charCode >= 49 && charCode <= 57) {
                this.activeKey = key;
            }
        };

        this.app = new PIXI.Application({
            backgroundColor: 0xFFFFFF,
            antialias: true,
            width: window.innerWidth,
            height: window.innerHeight,
        });
        document.body.appendChild(this.app.view);

        // Board
        const group = new PIXI.Container();


        // Bottom
        group.addChild(this.getHexagon(-45 * 3, 74));
        group.addChild(this.getHexagon(45, 74));
        group.addChild(this.getHexagon(-45, 74));
        group.addChild(this.getHexagon(45 * 3, 74));
        group.addChild(this.getHexagon(45 * 5, 74));

        // top
        group.addChild(this.getHexagon(-45, -74));
        group.addChild(this.getHexagon(45, -74));
        group.addChild(this.getHexagon(45 * 3, -74));
        group.addChild(this.getHexagon(-45 * 3, -74));

        // Center
        group.addChild(this.getHexagon(-90, 0));
        group.addChild(this.getHexagon(0, 0));
        group.addChild(this.getHexagon(90, 0));
        group.addChild(this.getHexagon(-90 * 2, 0));
        group.addChild(this.getHexagon(90 * 2, 0));

        // Bottom vol 2
        group.addChild(this.getHexagon(0, 74 * 2));
        group.addChild(this.getHexagon(45 * 2, 74 * 2));
        group.addChild(this.getHexagon(45 * 4, 74 * 2));

        // group.pivot.set(group.width / 2, group.height / 2);
        group.position.set(this.app.renderer.width / 2, this.app.renderer.height / 2);
        this.app.stage.addChild(group);

        // Animation loop
        this.app.ticker.add((delta) => {
            // circle.position.x += delta * 0.3;
        });
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
                player.tint = 0x85c7f2;
                player.scale.set(0.7);
                player.position.x += 12.5;
                player.position.y += 13;

                // player.fill.color =  0x000000;
                player.fill.alpha = 1;

                shape.addChild(player);


                const number = new PIXI.Text(this.activeKey || "", {
                    fontSize: 26,
                    fontWeight: 'bold',
                    fill: 0x85c7f2
                });
                number.tint = 0x85c7f2;

                number.pivot.set(number.width / 2, number.height / 2);
                number.position.set(player.position.x + 28, player.position.y + 30);

                shape.addChild(number);

                shape.tint = 0x85c7f2;

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

