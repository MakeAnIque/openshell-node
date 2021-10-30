const commandEmitterAndListener = require("../events/events");
const { exec } = require("child_process");
const CommandParser = require("../utils/command-parser");

class Terminal {
  bufferLimit = 100;
  logObject = [];
  cmdOpt = {
    currentWorkingDirectory: __dirname,
  };
  constructor() {
    this.init();
  }

  async init() {}

  executeCommand(commandDataObject) {
    const { command } = commandDataObject;
    new CommandParser().parseCommand(command, this.cmdOpt);

    exec(
      command,
      { cwd: this.cmdOpt.currentWorkingDirectory },
      (error, stdout, stderr) => {
        if (error) commandEmitterAndListener.emit("command-output", [error]);

        this.filterSame(stdout || stderr);
        commandEmitterAndListener.emit("command-output", this.logObject);
      }
    );
  }

  filterSame(data) {
    const limit = this.logObject.length - this.bufferLimit;

    if (limit >= 0) {
      this.logObject = this.logObject.slice(limit, this.logObject.length);
    }

    this.logObject.push(data);
  }
}

module.exports = Terminal;
