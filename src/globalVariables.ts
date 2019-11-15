export namespace globalVariables {
    let variables = {
        activeKey: "1",
        activeColor: "0x85c7f2"
    }
    export function setActiveKey(input) {
        this.variables.activeKey = input;
    }
    export function setActiveColor(input) {
        this.variables.activeColor = input;
    }
    export function getActiveKey() {
        return this.variables.activeColor;
    }
    export function getActiveColor() {
        return this.variables.activeColor;
    }
}
