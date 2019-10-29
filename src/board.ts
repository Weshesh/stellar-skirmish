import {Container, Application} from "pixi.js";
import {Hexagon} from "./hexagon";
import {Config} from "./config";


export namespace Board {
    let xPos = Config.xPos;
    let yPos = Config.yPos;
    let side = Config.side;
    
    const group = new Container();
    
    export function generate(app: Application) {
        for (let layer = 0; layer < 6 ; layer++) {
            group.addChild(Hexagon.create(xPos, yPos));
            for (let index = 0; index < side; index++) {
                xPos += Config.xStep * 2;
                group.addChild(Hexagon.create(xPos, yPos));
            }
            for (let index = 0; index < side; index++) {
                xPos += Config.xStep;
                yPos += Config.yStep;
                group.addChild(Hexagon.create(xPos, yPos));
            }
            for (let index = 0; index < side; index++) {
                xPos -= Config.xStep;
                yPos += Config.yStep;
                group.addChild(Hexagon.create(xPos, yPos));
            }
            for (let index = 0; index < side; index++) {
                xPos -= Config.xStep * 2;
                group.addChild(Hexagon.create(xPos, yPos));
            }
            for (let index = 0; index < side; index++) {
                xPos -= Config.xStep;
                yPos -= Config.yStep;
                group.addChild(Hexagon.create(xPos, yPos));
            }
            for (let index = 0; index < side; index++) {
                xPos += Config.xStep;
                yPos -= Config.yStep;
                group.addChild(Hexagon.create(xPos, yPos));
            }
            xPos -= Config.xStep;
            yPos -= Config.yStep;
            side += 1;
        }
        
        // Center position
        group.position.set(app.renderer.width / 2, app.renderer.height / 2);
        
        return group;
    }
}
