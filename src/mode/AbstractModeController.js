import { EventModel } from 'react-event-base/Core';
import { createEventTypes } from 'react-event-base/EventUtils';

export const Events = createEventTypes([
    'Changed'
]);

class AbstractModeController extends EventModel {

    constructor(data) {
        super(data);
        this.modes = this.modes || {};
    }

    initializeHandlers(modes) {
        this.modes = modes;
    }

    destroyMode() {
        const {mode} = this;
        if(mode) {
            mode.destroy();
            delete this.mode;
        }
    }

    changeMode(key) {
        this.destroyMode();
        const ModeConstructor = this.modes[key];
        if(ModeConstructor) {
            this.key = key;
            const mode = this.mode = new ModeConstructor(this.modeArgs);
            mode.initialize();
            this.trigger(Events.Changed);
        } else {
            console.error(`[ModeController] Invalid key of mode: ${key}`);
        }
    }

}

export default AbstractModeController;
