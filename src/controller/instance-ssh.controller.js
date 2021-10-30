const InstanceSSHEventsSSHService = require("../service/instance-ssh-events.service");

const instanceArray = [];

class InstanceSSHEventsController {
  httpPacketHandlerObject;
  constructor(httpPacketHandlerObject) {
    this.httpPacketHandlerObject = httpPacketHandlerObject;
  }

  async getResult() {
    const { req, res } = this.httpPacketHandlerObject;
    try {
      const _id = req.body._id;

      const commandObject = this.makeSSHQueryModel(req);

      const _log = instanceArray.find((innerAccu) => innerAccu._id === _id);

      if (!_log) {
        const log = new InstanceSSHEventsSSHService();

        log.getData(commandObject);

        instanceArray.push({
          _id: _id,
          refLog: log,
        });
      } else {
        _log.refLog.getData(commandObject);
      }

      res.status(200).send({
        message: "Successfully Command Initiated",
        status: true,
      });
    } catch (executeCommandExecException) {
      res.status(400).end(executeCommandExecException);
    }
  }

  makeSSHQueryModel(req) {
    class CommandEvent {
      eventName = "";
      command = "";

      constructor(plainObject) {
        Object.assign(this, plainObject);
      }
    }

    return new CommandEvent(req.body);
  }
}

module.exports = InstanceSSHEventsController;
