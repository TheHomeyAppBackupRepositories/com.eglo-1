"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const zigbee_clusters_1 = require("zigbee-clusters");
class EgloMotionSensor extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
            this.debug('Debug mode enabled');
        }
        await super.onNodeInit({ zclNode, node });
        this.deviceSettings = this.getSettings();
        this.registerCapability('alarm_motion', zigbee_clusters_1.CLUSTER.OCCUPANCY_SENSING, {
            getOpts: {
                getOnStart: true,
                getOnOnline: true,
            },
            reportParser: (value) => value['occupied'],
            reportOpts: {
                configureAttributeReporting: {
                    minInterval: 0,
                    maxInterval: 3600,
                    minChange: 0,
                },
            },
        });
        this.registerCapability('measure_luminance', zigbee_clusters_1.CLUSTER.ILLUMINANCE_MEASUREMENT, {
            getOpts: {
                getOnStart: true,
                getOnOnline: true,
            },
            reportParser: (value) => {
                const newValue = Math.round(10 ** ((value - 1) / 10000));
                this.updateAlarmNight(newValue);
                return newValue;
            },
            reportOpts: {
                configureAttributeReporting: {
                    minInterval: 0,
                    maxInterval: 3600,
                    minChange: 0,
                },
            },
        });
        await this.configureNightAlarm();
    }
    async onSettings({ newSettings, changedKeys }) {
        this.debug('Device settings updated', newSettings, changedKeys);
        this.deviceSettings = newSettings;
        if (changedKeys.includes('enable_night_alarm')) {
            // Also updates the value when enabled
            await this.configureNightAlarm();
        }
        else if (changedKeys.includes('night_alarm_threshold')) {
            this.updateAlarmNight();
        }
    }
    async configureNightAlarm() {
        if (this.deviceSettings.enable_night_alarm) {
            if (!this.hasCapability('alarm_night')) {
                this.debug('Adding alarm_night capability');
                await this.addCapability('alarm_night');
            }
            this.updateAlarmNight(this.getCapabilityValue('measure_luminance'));
        }
        else {
            if (this.hasCapability('alarm_night')) {
                this.debug('Removing alarm_night capability');
                await this.removeCapability('alarm_night');
            }
        }
    }
    updateAlarmNight(newValue) {
        if (!this.hasCapability('alarm_night')) {
            return;
        }
        newValue = Number(newValue ?? this.getCapabilityValue('measure_luminance'));
        if (Number.isNaN(newValue) || !Number.isInteger(newValue)) {
            this.debug('Invalid luminance value', newValue);
            return;
        }
        this.debug('Updating alarm_night capability', newValue, this.deviceSettings.night_alarm_threshold);
        this.setCapabilityValue('alarm_night', newValue <= this.deviceSettings.night_alarm_threshold).catch(this.error);
    }
}
module.exports = EgloMotionSensor;
//# sourceMappingURL=device.js.map