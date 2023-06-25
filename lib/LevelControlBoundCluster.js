"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class LevelControlBoundCluster extends zigbee_clusters_1.BoundCluster {
    constructor(onMoveToLevel, onStep, onEffect) {
        super();
        this._onStep = onStep;
        this._onEffect = onEffect;
        this._onMoveToLevel = onMoveToLevel;
    }
    moveToLevel(payload, meta) {
        if (typeof this._onMoveToLevel === 'function') {
            this._onMoveToLevel(payload, meta);
        }
    }
    moveToLevelWithOnOff(payload, meta) {
        this.moveToLevel(payload, meta);
    }
    step(payload, meta) {
        if (typeof this._onStep === 'function') {
            this._onStep(payload, meta);
        }
    }
    stepWithOnOff(payload, meta) {
        this.step(payload, meta);
    }
    lightEffect(payload, meta) {
        if (typeof this._onEffect === 'function') {
            this._onEffect(payload, meta);
        }
    }
}
exports.default = LevelControlBoundCluster;
//# sourceMappingURL=LevelControlBoundCluster.js.map