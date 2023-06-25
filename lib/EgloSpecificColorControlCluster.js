"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ColorControlCluster, ZCLDataTypes } = require("zigbee-clusters");
class EgloSpecificColorControlCluster extends ColorControlCluster {
    static get COMMANDS() {
        return {
            ...super.COMMANDS,
            colorTempStep: {
                id: 76,
                args: {
                    stepX: ZCLDataTypes.uint16,
                    stepY: ZCLDataTypes.uint16,
                    transitionTime: ZCLDataTypes.uint16
                }
            },
            stepToHueAndSaturation: {
                id: 48,
                args: {
                    saturation: ZCLDataTypes.uint8,
                    hue: ZCLDataTypes.uint8,
                    transitionTime: ZCLDataTypes.uint16,
                },
            },
            colorWheel: {
                id: 65,
                args: {
                    direction: ZCLDataTypes.uint8,
                    data: ZCLDataTypes.uint8,
                    data2: ZCLDataTypes.uint32
                }
            }
        };
    }
}
exports.default = EgloSpecificColorControlCluster;
//# sourceMappingURL=EgloSpecificColorControlCluster.js.map