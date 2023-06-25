"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ScenesCluster, ZCLDataTypes } = require("zigbee-clusters");
class EgloSpecificScenesCluster extends ScenesCluster {
    static get COMMANDS() {
        return {
            ...super.COMMANDS,
            storeScene: {
                id: 4,
                args: {
                    groupId: ZCLDataTypes.uint16,
                    sceneId: ZCLDataTypes.uint8
                }
            },
            recallScene: {
                id: 5,
                args: {
                    groupId: ZCLDataTypes.uint16,
                    sceneId: ZCLDataTypes.uint8
                }
            },
        };
    }
}
exports.default = EgloSpecificScenesCluster;
//# sourceMappingURL=EgloSpecificScenesCluster.js.map