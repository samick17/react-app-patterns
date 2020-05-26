import { EventModel } from 'react-event-base/Core';
import { createEventTypes } from 'react-event-base/EventUtils';

export const Events = createEventTypes([
	'Undo',
	'Redo',
	'Execute',
	'Clear',
	'Reload'
]);

class CommandManager extends EventModel {

	undoArray = []
	redoArrray = []

	getMaxStackSize() {
		return this.maxStackSize || 999;
	}

	getId() {
		return this.id;
	}

	pushCommand(command) {
		const maxStackSize = this.getMaxStackSize();
		this.undoArray.push(command);
		this.redoArrray.splice(0, this.redoArrray.length);
		if(this.undoArray.length > maxStackSize) {
			this.undoArray.splice(0, this.undoArray.length - maxStackSize);
		}
		this.trigger(Events.Execute, [command]);
	}

	execute(command) {
		const result = command.execute();
		this.pushCommand(command);
		return result;
	}

	canUndo() {
		return this.undoArray.length > 0;
	}

	canRedo() {
		return this.redoArrray.length > 0;
	}

	undo() {
		const lastCmd = this.redoArrray[this.redoArrray.length - 1];
		if(lastCmd) {
			lastCmd.unExecuteBeforeUndo();
		}
		try {
			const command = this.undoArray.pop();
			if(command) {
				this.redoArrray.push(command);
				command.unExecute();
				this.trigger(Events.Undo, [command]);
			}
		} catch(err) {
			console.error(err);
		}
	}

	getUndoSteps() {
		return this.undoArray.length;
	}

	redo() {
		const lastCmd = this.redoArrray[this.redoArrray.length - 2];
		if(lastCmd) {
			lastCmd.executeAfterRedo();
		}
		try {
			const command = this.redoArrray.pop();
			if(command) {
				this.undoArray.push(command);
				command.execute();
				this.trigger(Events.Redo, [command]);
			}
		} catch(err) {
			console.error(err);
		}
	}

	getRedoSteps() {
		return this.redoArrray.length;
	}

	clear() {
		this.undoArray.splice(0, this.undoArray.length);
		this.redoArrray.splice(0, this.redoArrray.length);
		this.trigger(Events.Clear);
	}

	destroy() {
		this.undoArray = undefined;
		this.redoArrray = undefined;
	}

	dump() {

	}

	reload(commandManager) {
		this.undoArray.splice.apply(this.undoArray, [0, this.undoArray.length].concat(commandManager.undoArray));
		this.redoArrray.splice.apply(this.redoArrray, [0, this.redoArrray.length].concat(commandManager.redoArrray));
		this.trigger(Events.Reload);
	}

}

export default CommandManager;
