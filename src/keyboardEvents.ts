import * as PIXI from 'pixi.js'
import { globalVariables } from './globalVariables'

export namespace keyboardEvents {
        export function keyPress({ charCode, key }: KeyboardEvent) {
        if (charCode >= 49 && charCode <= 54 || charCode == 32) {
            if (charCode === 32) {
                if (globalVariables.getActiveColor() === "0xf28590") {
                    globalVariables.setActiveColor("0x85c7f2");
                    return;
                }
                else 
                globalVariables.setActiveColor("0xf28590");
            }
        }
    }
}
