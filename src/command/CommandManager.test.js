import CommandManager from './CommandManager';
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

test('CommandManager', () => {
  let cmdMgr = new CommandManager();
  let cmd = new FakeCommand();
  cmdMgr.execute(cmd);
  expect(cmd.value).toBe(1);
  cmdMgr.undo();
  expect(cmd.value).toBe(0);
  cmdMgr.redo();
  expect(cmd.value).toBe(1);
  cmdMgr.undo();
  expect(cmd.value).toBe(0);
  cmdMgr.redo();
  expect(cmd.value).toBe(1);
});

test('CommandManager:undo multiple times, should be avoid auto.', () => {
  let cmdMgr = new CommandManager();
  let cmd = new FakeCommand();
  cmdMgr.execute(cmd);
  expect(cmd.value).toBe(1);
  cmdMgr.undo();
  cmdMgr.undo();
  cmdMgr.undo();
  cmdMgr.undo();
  cmdMgr.undo();
  expect(cmd.value).toBe(0);
});

test('CommandManager:execute macro command', () => {
  let cmdMgr = new CommandManager();
  let context = {};
  let cmd = new MacroCommand([new FakeOpCommand1(context), new FakeOpCommand2(context)]);
  cmdMgr.execute(cmd);
  expect(context.v1).toBe('c1');
  expect(context.v2).toBe('c2');
  cmdMgr.undo();
  expect(context.v1).toBe();
  expect(context.v2).toBe();
});

test('CommandManager:limited stack size', () => {
  let maxStackSize = 20;
  let cmdMgr = new CommandManager({
    maxStackSize: maxStackSize
  });
  let context = {};

  for(let i = 0; i < maxStackSize; i++) {
    let cmd = new MacroCommand([new FakeOpCommand1(context), new FakeOpCommand2(context)]);
    cmd._index = i;
    cmdMgr.execute(cmd);
  }

  let cmd = new MacroCommand([new FakeOpCommand1(context), new FakeOpCommand2(context)]);
  cmd._index = maxStackSize;
  cmdMgr.execute(cmd);

  expect(cmdMgr.getUndoSteps()).toBe(maxStackSize);
  expect(cmdMgr.undoArray[0]._index).toBe(1);
  expect(cmdMgr.undoArray[cmdMgr.undoArray.length - 1]._index).toBe(maxStackSize);

});
