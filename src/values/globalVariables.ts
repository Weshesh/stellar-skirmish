import { globalConstants } from './globalConstants'

export namespace globalVariables {

    let activeKey: string = "1";
    let activeColor: number = globalConstants.colors.blue;
    
    export function setActiveKey(input: number) {
        this.activeKey = input;
    }
    export function setActiveColor(input: number) {
        this.activeColor = input;
    }
    export function getActiveKey() {
        return this.activeColor;
    }
    export function getActiveColor() {
        return this.activeColor;
    }
}
