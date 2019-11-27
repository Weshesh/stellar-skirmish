import {Hexagon} from "./hexagon/hexagon";

export namespace Config {
    export const yPos = 0;
    export const xPos = 0;
    export const side = 0;
    export const xStep = Hexagon.config.xAxisStep + 5;
    export const yStep = Hexagon.config.hexagonDiameter * 1.5 + 7;
}
