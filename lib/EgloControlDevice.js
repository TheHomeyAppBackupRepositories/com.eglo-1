"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const zigbee_clusters_1 = require("zigbee-clusters");
const OnOffBoundCluster_1 = __importDefault(require("./OnOffBoundCluster"));
const ColorControlBoundCluster_1 = __importDefault(require("./ColorControlBoundCluster"));
const EgloSpecificColorControlCluster_1 = __importDefault(require("./EgloSpecificColorControlCluster"));
const SceneBoundCluster_1 = __importDefault(require("./SceneBoundCluster"));
const EgloSpecificScenesCluster_1 = __importDefault(require("./EgloSpecificScenesCluster"));
const EgloSpecificLevelControlCluster_1 = __importDefault(require("./EgloSpecificLevelControlCluster"));
const LevelControlBoundCluster_1 = __importDefault(require("./LevelControlBoundCluster"));
zigbee_clusters_1.Cluster.addCluster(EgloSpecificColorControlCluster_1.default);
zigbee_clusters_1.Cluster.addCluster(EgloSpecificScenesCluster_1.default);
zigbee_clusters_1.Cluster.addCluster(EgloSpecificLevelControlCluster_1.default);
class EgloControlDevice extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        this.enableDebug();
        await super.onNodeInit({ zclNode, node });
        zclNode.endpoints[1].bind(zigbee_clusters_1.CLUSTER.ON_OFF.NAME, new OnOffBoundCluster_1.default((meta) => this._onOffCommandHandler('off', meta), (meta) => this._onOffCommandHandler('on', meta)));
        zclNode.endpoints[1].bind(EgloSpecificLevelControlCluster_1.default.NAME, new LevelControlBoundCluster_1.default((payload, meta) => this._onMoveToLevelWithOnOffHandler(payload, meta), (payload, meta) => this._onStepWithOnOffHandler(payload, meta), (payload, meta) => this._onLightEffectHandler(payload, meta)));
        zclNode.endpoints[1].bind(EgloSpecificColorControlCluster_1.default.NAME, new ColorControlBoundCluster_1.default((payload, meta) => this._colorTempStepHandler(payload, meta, false), (payload, meta) => this._colorTempMoveHandler(payload, meta, true), (payload, meta) => this._onColorHandler(payload, meta), (payload, meta) => this._onColorHandler(payload, meta), (payload, meta) => this._onColorWheelHandler(payload, meta)));
        zclNode.endpoints[1].bind(EgloSpecificScenesCluster_1.default.NAME, new SceneBoundCluster_1.default((payload, meta) => this._sceneHandler(payload, meta, false), (payload, meta) => this._sceneHandler(payload, meta, true)));
    }
    _onOffCommandHandler(type, meta) {
        let flowId;
        switch (type) {
            case 'on':
                flowId = 'remote_on';
                break;
            case 'off':
                flowId = 'remote_off';
                break;
            default:
                this.error(`Invalid on/off type ${type}`);
                return;
        }
        this.triggerFlowWithState(flowId, {
            group: this.extractGroupId(meta.groupId),
        });
    }
    _onMoveToLevelWithOnOffHandler(payload, meta) {
        let flowId;
        switch (payload.level) {
            case 254:
                flowId = 'remote_step_up';
                break;
            case 1:
                flowId = 'remote_step_down';
                break;
            default:
                this.error(`Invalid payload level ${payload.level}`);
                return;
        }
        this.triggerFlowWithState(flowId, {
            long_press: true,
            group: this.extractGroupId(meta.groupId),
        });
    }
    _onStepWithOnOffHandler(payload, meta) {
        this.triggerFlowWithState(payload.mode === 'up' ? 'remote_step_up' : 'remote_step_down', {
            long_press: false, group: this.extractGroupId(meta.groupId),
        });
    }
    _colorTempStepHandler(payload, meta, long_press) {
        if (payload.stepX === 8193) {
            this.triggerFlowWithState('remote_warmer', {
                long_press: long_press,
                group: this.extractGroupId(meta.groupId),
            });
        }
        else if (payload.stepX === 8195) {
            this.triggerFlowWithState('remote_cooler', {
                long_press: long_press,
                group: this.extractGroupId(meta.groupId),
            });
        }
    }
    _colorTempMoveHandler(payload, meta, long_press) {
        if (payload.colorTemperature === 454) {
            this.triggerFlowWithState('remote_warmer', {
                long_press: long_press,
                group: this.extractGroupId(meta.groupId),
            });
        }
        else if (payload.colorTemperature === 153) {
            this.triggerFlowWithState('remote_cooler', {
                long_press: long_press,
                group: this.extractGroupId(meta.groupId),
            });
        }
    }
    _sceneHandler(payload, meta, long_press) {
        if (payload.sceneId !== 1 && payload.sceneId !== 2) {
            this.error(`Invalid preference button ${payload.sceneId}`);
        }
        this.triggerFlowWithState('remote_preference_' + payload.sceneId, {
            long_press: long_press,
            group: this.extractGroupId(meta.groupId),
        });
    }
    _onColorHandler(payload, meta) {
        let color;
        switch (payload.hue) {
            case 255:
                color = 'red';
                break;
            case 170:
                color = 'blue';
                break;
            case 85:
                color = 'green';
                break;
            case 42:
                color = 'yellow';
                break;
            default:
                this.error(`Invalid hue ${payload.hue}`);
                return;
        }
        this.triggerFlowWithState('remote_color_' + color, {
            long_press: payload.saturation === 255,
            group: this.extractGroupId(meta.groupId),
        });
    }
    _onColorWheelHandler(payload, meta) {
        this.triggerFlowWithState('remote_color_wheel', {
            inverted: payload.direction === 3,
            group: this.extractGroupId(meta.groupId),
        });
    }
    _onLightEffectHandler(payload, meta) {
        this.triggerFlowWithState('remote_light_effect', {
            effect: payload.effect,
            group: this.extractGroupId(meta.groupId),
        });
    }
    triggerFlowWithState(flowId, data) {
        this.triggerFlow({ id: flowId, tokens: data })
            .catch(err => this.error('error triggering flow', err));
    }
    extractGroupId(groupId) {
        if (groupId > 32777) {
            return groupId - 32777;
        }
        return 1;
    }
}
exports.default = EgloControlDevice;
//# sourceMappingURL=EgloControlDevice.js.map