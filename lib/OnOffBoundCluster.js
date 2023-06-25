"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class OnOffBoundCluster extends zigbee_clusters_1.BoundCluster {
    constructor(onSetOff, onSetOn) {
        super();
        this._onSetOff = onSetOff;
        this._onSetOn = onSetOn;
    }
    setOn(payload, meta) {
        if (typeof this._onSetOn === 'function') {
            this._onSetOn(meta);
        }
    }
    setOff(payload, meta) {
        if (!this._onSetOff) {
            return;
        }
        this._onSetOff(meta);
    }
}
exports.default = OnOffBoundCluster;
//# sourceMappingURL=OnOffBoundCluster.js.map