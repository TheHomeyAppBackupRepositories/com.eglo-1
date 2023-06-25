"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
class EgloDevice extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        await super.onNodeInit({ zclNode, node });
        await this.setUnavailable(this.homey.__('legacy-device'));
    }
}
module.exports = EgloDevice;
//# sourceMappingURL=device.js.map