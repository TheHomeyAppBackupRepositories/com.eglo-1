"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_log_1 = require("homey-log");
const source_map_support_1 = __importDefault(require("source-map-support"));
const zigbee_clusters_1 = require("zigbee-clusters");
source_map_support_1.default.install();
class EgloApp extends homey_1.default.App {
    onInit() {
        if (homey_1.default.env.DEBUG === '1') {
            (0, zigbee_clusters_1.debug)(true);
        }
        this.homeyLog = new homey_log_1.Log({ homey: this.homey });
        this.log('Eglo has been initialized');
        return Promise.resolve();
    }
}
module.exports = EgloApp;
//# sourceMappingURL=app.js.map