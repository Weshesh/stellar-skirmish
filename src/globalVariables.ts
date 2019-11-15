export namespace globalVariables {
    export class Variables {
        private data = {
            activeKey: "1",
            activeColor: "0x85c7f2"
        }
        public setActiveKey(input) {
            this.data.activeKey = input;
        }
        public setActiveColor(input) {
            this.data.activeColor = input;
        }
        public getActiveKey() {
            return this.data.activeColor;
        }
        public getActiveColor() {
            return this.data.activeColor;
        }
    }
}