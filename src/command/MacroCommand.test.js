import BaseCommand from './BaseCommand';
import MacroCommand from './MacroCommand';

class FakeCommand extends BaseCommand {
	value = 0
	doExecute() {
		this.value++;
	}
	doUnexecute() {
		this.value--;
	}
};

class FakeOpCommand extends BaseCommand {
	constructor(context) {
		super();
		this.context = context;
	}
};

class FakeOpCommand1 extends FakeOpCommand {
	doExecute() {
		this.context.v1 = 'c1';
	}
	doUnexecute() {
		delete this.context.v1;
	}
};

class FakeOpCommand2 extends FakeOpCommand {
	doExecute() {
		this.context.v2 = 'c2';
	}
	doUnexecute() {
		delete this.context.v2;
	}
};

test('MacroCommand', () => {
	let context = {};
	let cmd = new MacroCommand([new FakeOpCommand1(context), new FakeOpCommand2(context)]);
	cmd.execute(cmd);
	expect(context.v1).toBe('c1');
	expect(context.v2).toBe('c2');
	cmd.unExecute();
	expect(context.v1).toBe();
	expect(context.v2).toBe();
});
