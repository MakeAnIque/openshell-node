const EventEmitter = require("events");

EventEmitter.defaultMaxListeners = Infinity;
class CommandEmitterAndListener extends EventEmitter {}

const commandEmitterAndListener = new CommandEmitterAndListener();

/***
 * EVENT TYPE LISTEN
 */

/**
 * EVENT TYPE: EMIT
 *
 */

module.exports = commandEmitterAndListener;
