import { NOOP } from 'react-event-base/ObjectUtils';

class BaseCommand {

	requiredArgs = [];
	onPreExecute = () => {
		this.firstPreExecute();
		this.onPreExecute = NOOP;
	};
	onPostExecute = () => {
		this.firstPostExecute();
		this.onPostExecute = NOOP;
	};

	init(args) {
		this.onBeforeInit();
		this.requiredArgs.forEach(argKey => {
			if(!(argKey in args)) {
				console.warn(`[Command:${this.name}] Argument missing: ${argKey} while initializing command.`);
			}
		});
		Object.assign(this, args);
		this.onAfterInit();
	}

	onAfterInit() {}

	initializeRequiredArgs() {
		return [];
	}

	execute() {
		this.onPreExecute();
		const result = this.doExecute();
		this.onPostExecute();
		return result;
	}

	firstPreExecute() {}
	firstPostExecute() {}

	executeAfterRedo() {
		this.doExecuteAfterRedo();
	}

	unExecute() {
		this.doUnexecute();
	}

	unExecuteBeforeUndo() {
		this.doUnExecuteBeforeUndo();
	}

	doExecute() {}

	doExecuteAfterRedo() {}

	doUnexecute() {}

	doUnExecuteBeforeUndo() {}

	dispose() {}

	getMessage() {}

}

export default BaseCommand;
