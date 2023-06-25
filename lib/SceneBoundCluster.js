"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class SceneBoundCluster extends zigbee_clusters_1.BoundCluster {
    constructor(onScene, onStore) {
        super();
        this._onScene = onScene;
        this._onStore = onStore;
    }
    storeScene(payload, meta) {
        if (typeof this._onStore === 'function') {
            this._onStore(payload, meta);
        }
    }
    recallScene(payload, meta) {
        if (typeof this._onScene === 'function') {
            this._onScene(payload, meta);
        }
    }
}
exports.default = SceneBoundCluster;
//# sourceMappingURL=SceneBoundCluster.js.map