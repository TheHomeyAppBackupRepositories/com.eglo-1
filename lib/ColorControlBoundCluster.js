"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class ColorControlBoundCluster extends zigbee_clusters_1.BoundCluster {
    constructor(onColorTempStep, onColorTempMove, onStepToHueAndSaturation, onMoveToHueAndSaturation, onColorWheel) {
        super();
        this._onColorTempStep = onColorTempStep;
        this._onColorTempMove = onColorTempMove;
        this._onStepToHueAndSaturation = onStepToHueAndSaturation;
        this._onMoveToHueAndSaturation = onMoveToHueAndSaturation;
        this._onColorWheel = onColorWheel;
    }
    colorTempStep(payload, meta) {
        if (typeof this._onColorTempStep === 'function') {
            this._onColorTempStep(payload, meta);
        }
    }
    moveToColorTemperature(payload, meta) {
        if (typeof this._onColorTempMove === 'function') {
            this._onColorTempMove(payload, meta);
        }
    }
    stepToHueAndSaturation(payload, meta) {
        if (typeof this._onStepToHueAndSaturation === 'function') {
            this._onStepToHueAndSaturation(payload, meta);
        }
    }
    moveToHueAndSaturation(payload, meta) {
        if (typeof this._onMoveToHueAndSaturation === 'function') {
            this._onMoveToHueAndSaturation(payload, meta);
        }
    }
    colorWheel(payload, meta) {
        if (typeof this._onColorWheel === 'function') {
            this._onColorWheel(payload, meta);
        }
    }
}
exports.default = ColorControlBoundCluster;
//# sourceMappingURL=ColorControlBoundCluster.js.map