import {Container, Application} from "pixi.js";

export namespace Board {
    const config = {
        yPos: 0,
        xPos: 0,
        side: 0,
        xStep: 50,
        yStep: 75
    };

    const group = new Container();

    export function generate(app: Application, getHexagon: any) {
        for (let layer = 0; layer < 6 ; layer++) {
            group.addChild(getHexagon(config.xPos, config.yPos)); //the first hex
            //yStep - to add
            //xStep
            if (config.side > 0) {
                for (let index = 0; index < config.side; index++) {
                    config.xPos += config.xStep * 2;
                    group.addChild(getHexagon(config.xPos, config.yPos));
                }
                for (let index = 0; index < config.side; index++) {
                    config.xPos += config.xStep;
                    config.yPos += config.yStep;
                    group.addChild(getHexagon(config.xPos, config.yPos));
                }
                for (let index = 0; index < config.side; index++) {
                    config.xPos -= config.xStep;
                    config.yPos += config.yStep;
                    group.addChild(getHexagon(config.xPos, config.yPos));
                }
                for (let index = 0; index < config.side; index++) {
                    config.xPos -= config.xStep * 2;
                    group.addChild(getHexagon(config.xPos, config.yPos));
                }
                for (let index = 0; index < config.side; index++) {
                    config.xPos -= config.xStep;
                    config.yPos -= config.yStep;
                    group.addChild(getHexagon(config.xPos, config.yPos));
                }
                for (let index = 0; index < config.side; index++) {
                    config.xPos += config.xStep;
                    config.yPos -= config.yStep;
                    group.addChild(getHexagon(config.xPos, config.yPos));
                }
            }
            config.xPos -= 50;
            config.yPos -= 75;
            config.side += 1;
        }

        // Center position
        group.position.set(app.renderer.width / 2, app.renderer.height / 2);

        return group;
    }
}
