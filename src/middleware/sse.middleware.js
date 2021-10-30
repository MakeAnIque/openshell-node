const commandEmitterAndListener = require("../events/events");
const fse = require("fs-extra");

function eventsHandler(request, response, next) {
  const headers = {
    "Content-Type": "text/event-stream; charset=utf-8",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  listenOutputEvent(response);

  request.on("close", () => {
    response.write("Connection END.");
  });
}

function listenOutputEvent(response) {
  commandEmitterAndListener.on("command-output", (output) => {
    response.write(
      "data: " + JSON.stringify({ data: output.join("") }) + "\n\n"
    );
  });
}

module.exports = eventsHandler;
