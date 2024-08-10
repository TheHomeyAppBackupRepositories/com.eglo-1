"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const zigbee_clusters_1 = require("zigbee-clusters");
const EGLO_DEBOUNCE_TIMEOUT = 250;
class EgloRgbBulb extends homey_zigbeedriver_1.ZigBeeLightDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        if (this.supportsHueAndSaturation) {
            // Migrate added capability
            if (!this.hasCapability('light_mode')) {
                await this.addCapability('light_mode');
            }
        }
        await super.onNodeInit({ zclNode, node });
        if (!this.supportsColorTemperature && this.hasCapability('light_temperature')) {
            await this.removeCapability('light_temperature');
        }
        if (!this.supportsHueAndSaturation) {
            if (this.hasCapability('light_saturation')) {
                await this.removeCapability('light_saturation');
            }
            if (this.hasCapability('light_hue')) {
                await this.removeCapability('light_hue');
            }
            if (this.hasCapability('light_mode')) {
                await this.removeCapability('light_mode');
            }
        }
        if (this.hasCapability('onoff')) {
            this.debug('Register onoff handler');
            zclNode
                .endpoints[this.getClusterEndpoint(zigbee_clusters_1.CLUSTER.ON_OFF) ?? 1]
                .clusters[zigbee_clusters_1.CLUSTER.ON_OFF.NAME]
                .on('attr.onOff', (value) => {
                this.debug('Received onOff', value);
                this.setCapabilityValue('onoff', value).catch(this.error);
            });
        }
        if (this.hasCapability('dim')) {
            this.debug('Register dim handler');
            const debouncedDimHandler = homey_zigbeedriver_1.Util.debounce((value) => {
                this.debug('Debounced current level', value);
                this.setCapabilityValue('dim', value / 254).catch(this.error);
            }, EGLO_DEBOUNCE_TIMEOUT);
            zclNode
                .endpoints[this.getClusterEndpoint(zigbee_clusters_1.CLUSTER.LEVEL_CONTROL) ?? 1]
                .clusters[zigbee_clusters_1.CLUSTER.LEVEL_CONTROL.NAME]
                .on('attr.currentLevel', (value) => {
                this.debug('Received current level', value);
                debouncedDimHandler(value);
            });
        }
        if (this.supportsHueAndSaturation) {
            if (this.hasCapability('light_saturation')) {
                this.debug('Register light_saturation handler');
                const debouncedSaturationHandler = homey_zigbeedriver_1.Util.debounce((value) => {
                    this.debug('Debounced saturation', value);
                    this.setCapabilityValue('light_saturation', value / 254).catch(this.error);
                }, EGLO_DEBOUNCE_TIMEOUT);
                zclNode
                    .endpoints[this.getClusterEndpoint(zigbee_clusters_1.CLUSTER.COLOR_CONTROL) ?? 1]
                    .clusters[zigbee_clusters_1.CLUSTER.COLOR_CONTROL.NAME]
                    .on('attr.currentSaturation', (value) => {
                    this.debug('Received current saturation', value);
                    debouncedSaturationHandler(value);
                });
            }
            if (this.hasCapability('light_hue')) {
                this.debug('Register light_hue handler');
                const debouncedHueHandler = homey_zigbeedriver_1.Util.debounce((value) => {
                    this.debug('Debounced hue', value);
                    this.setCapabilityValue('light_hue', value / 254).catch(this.error);
                }, EGLO_DEBOUNCE_TIMEOUT);
                zclNode
                    .endpoints[this.getClusterEndpoint(zigbee_clusters_1.CLUSTER.COLOR_CONTROL) ?? 1]
                    .clusters[zigbee_clusters_1.CLUSTER.COLOR_CONTROL.NAME]
                    .on('attr.currentHue', (value) => {
                    this.debug('Received current hue', value);
                    debouncedHueHandler(value);
                });
            }
        }
    }
}
module.exports = EgloRgbBulb;
//# sourceMappingURL=device.js.map