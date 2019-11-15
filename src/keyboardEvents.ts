import * as PIXI from 'pixi.js'
import { globalConstants } from './values/globalConstants';
import { globalVariables } from './values/globalVariables';

export namespace keyboardEvents {
    export function keyPress({ charCode, key }: KeyboardEvent) {
        if (charCode >= 49 && charCode <= 54 || charCode == 32) {
            if (charCode === 32) {
                if (globalVariables.getActiveColor() === globalConstants.colors.red) {
                    globalVariables.setActiveColor(globalConstants.colors.blue);
                    return;
                }
                else {
                    globalVariables.setActiveColor(globalConstants.colors.red);
                    return;
                }
            }
            else {
                globalVariables.setActiveKey(charCode);
                return;
            }
        }
    }
}
