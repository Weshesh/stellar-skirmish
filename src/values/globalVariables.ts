import { globalConstants } from './globalConstants'

export namespace globalVariables {

    let activeKey: string = "1";
    let activeColor: number = globalConstants.colors.blue;
    
    export function setActiveKey(input: string) {
        activeKey = input;
    }
    export function setActiveColor(input: number) {
        activeColor = input;
    }
    export function getActiveKey() {
        return activeKey;
    }
    export function getActiveColor() {
        return activeColor;
    }
}
