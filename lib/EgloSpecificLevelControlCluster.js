"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { LevelControlCluster, ZCLDataTypes } = require("zigbee-clusters");
class EgloSpecificLevelControlCluster extends LevelControlCluster {
    static get COMMANDS() {
        return {
            ...super.COMMANDS,
            lightEffect: {
                id: 16,
                args: {
                    data: ZCLDataTypes.uint8,
                    effect: ZCLDataTypes.uint8
                }
            },
        };
    }
}
exports.default = EgloSpecificLevelControlCluster;
//# sourceMappingURL=EgloSpecificLevelControlCluster.js.map