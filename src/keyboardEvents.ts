import * as PIXI from 'pixi.js'
import { globalVariables } from './globalVariables'

export namespace keyboardEvents {
    export class keyPress{
        onKeyPress({charCode, key}: KeyboardEvent) {
            if (charCode >= 49 && charCode <= 54 || charCode == 32) {
                if (charCode === 32) {
                    const spacePressed = new globalVariables.Variables().getActiveColor;
                    if (spacePressed == "0xf28590") {
                        const = new globalVariables.Variables.setActiveKey(0x85c7f2);
                        
                        return;
                    }
                }
            }
        }
    }
}