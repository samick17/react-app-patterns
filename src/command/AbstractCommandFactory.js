import { EventModel } from 'react-event-base/Core';

class AbstractCommandFactory extends EventModel {

	constructor(data) {
		super(data);
		this.cmdTypes = this.cmdTypes || {};
		this.extraCmdArgs = this.extraCmdArgs || {};
	}

	createCommand(cmdType, args) {
		const Cmd = this.cmdTypes[cmdType];
		if(Cmd) {
			const cmd = new Cmd();
			cmd.init(Object.assign(args || {}, this.extraCmdArgs));
			return cmd;
		}
	}

	initializeCommands(cmdTypes) {
		this.cmdTypes = cmdTypes ||{};
	}

}

export default AbstractCommandFactory;

/*
class CommandFactory extends AbstractCommandFactory {
	
	constructor(data) {
		super(data);
		this.initializeCommands({
			
		});
	}

}
*/

