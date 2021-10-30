const Terminal = require("../terminal/terminal");
const commandEmitterAndListener = require("../events/events");

class InstanceSSHEventsSSHService extends Terminal {
  constructor() {
    super();
  }

  async getData(commandDataObject) {
    // commandEmitterAndListener.emit("command-exec", this.commandDataObject);
    this.executeCommand(commandDataObject);
  }
}

module.exports = InstanceSSHEventsSSHService;
