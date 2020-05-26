import BaseCommand from './BaseCommand';

class MacroCommand extends BaseCommand {

	constructor(commands) {
		super();
		this.commands = commands || [];
		this.isMacro = true;
	}

	doExecute() {
		for(let i = 0; i < this.commands.length; i++) {
			this.commands[i].execute();
		}
	}

	doUnexecute() {
		for(let i = this.commands.length - 1; i >= 0; i--) {
			this.commands[i].unExecute();
		}
	}
}

export default MacroCommand;
