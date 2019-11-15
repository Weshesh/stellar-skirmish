import * as PIXI from 'pixi.js'
import { globalVariables } from './globalVariables'

export namespace keyboardEvents {
    export class keyPress{
        onKeyPress({charCode, key}: KeyboardEvent) {
            if (charCode >= 49 && charCode <= 54 || charCode == 32) {
                if (charCode === 32) {
                    if (publicVariables.Variables.getActiveColor() == 0xf28590) {
                        colorKey = 0x85c7f2;
                        return;
                    }
                }
            }
        }
    }