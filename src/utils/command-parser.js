const path = require("path");
class CommandParser {
  constructor() {}

  parseCommand(command, cwd) {
    this.checkAndSwitch(command, cwd);
  }

  checkAndSwitch(command, cwd) {
    const splitCommand = command.split(" ");

    const firstCommand = splitCommand[0];

    const restArgs = splitCommand
      .slice(1, splitCommand.length)
      .filter((accu) => accu)
      .join(" ");

    switch (firstCommand) {
      case "cd":
        this.cdCommand(firstCommand, restArgs, cwd);
        break;
      default:
        console.log("");
    }
  }

  cdCommand(command, restArgs, cwd) {
    cwd.currentWorkingDirectory = path.join(
      cwd.currentWorkingDirectory,
      restArgs
    );
  }
}

module.exports = CommandParser;
