import {Hexagon} from "./hexagon";

export namespace Config {
    const hexPadding = 50;
    export const yPos = 0;
    export const xPos = 0;
    export const side = 0;
    export const xStep = Hexagon.config.hexRadius + 10;
    export const yStep = Hexagon.config.hexHeight *3;
}


const newConfig = {
    yPos: 0,
    xPos: 0,
}