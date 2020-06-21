class AbstractCommandFactory {

	constructor({cmdTypes, extraCmdArgs}={}) {
		this.cmdTypes = cmdTypes || {};
		this.extraCmdArgs = extraCmdArgs || {};
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
const CmdTypes = {
	
};

class CommandFactory extends AbstractCommandFactory {
	
	constructor(context) {
		super({
			cmdTypes: CmdTypes,
			extraCmdArgs: {
				context
			}
		});
	}

}
*/
