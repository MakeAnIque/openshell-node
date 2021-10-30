const commandEmitterAndListener = require("../events/events");
const { exec } = require("child_process");
const CommandParser = require("../utils/command-parser");
const os = require("os");
const pty = require("node-pty");
const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
class Terminal {
  ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });
  bufferLimit = 100;
  logObject = [];
  cmdOpt = {
    currentWorkingDirectory: __dirname,
  };
  constructor() {
    this.init();
  }

  async init() {
    ptyProcess.on("data", (data) => {
      if (this.filterSameNodePty(data)) {
        return;
      }
      commandEmitterAndListener.emit("command-output", this.logObject);
    });
  }

  executeCommand(commandDataObject) {
    const { command, terminalType } = commandDataObject;

    if (terminalType === "node-pty") {
      this.ptyProcess.write(`${command}\r`);
    }

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

  filterSameNodePty(data) {
    if (this.logObject.includes(data)) {
      return true;
    }
    const limit = this.logObject.length - this.bufferLimit;

    if (limit >= 0) {
      this.logObject = this.logObject.slice(limit, this.logObject.length);
    }

    this.logObject.push(data);
    return false;
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
