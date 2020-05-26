import { EventModel } from 'react-event-base/Core';

class Mode extends EventModel {

	initialize() {
		console.log(`----Initialize mode [${this.type}]`);
	}

	destroy() {
		
	}

}
export default Mode;
