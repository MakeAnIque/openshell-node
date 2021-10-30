const express = require("express");
const eventsHandler = require("./src/middleware/sse.middleware");
const readConfigFile = require("./src/utils/config-file.util");
const verifyToken = require("./src/utils/jwt-verification.middleware");
const InstanceSSHEventsController = require("./src/controller/instance-ssh.controller");
const app = express();
const cors = require("cors");

const config = readConfigFile();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
/**
 *
 * COMMAND RECEIVER
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

app.post(
  "/instance-ssh-events",
  async (req, res, next) =>
    await new InstanceSSHEventsController({ req, res, next }).getResult()
);

/***
 * COMMAND OUTPUT RESULT EMITTER
 */

app.get("/ssh-output-events", eventsHandler);

app.get("/health", (req, res, next) => {
  res.send("okay");
});

app.listen(process.env.NODE_PORT || 9000, () => {
  console.log(process.env.SECRET_KEY);
  console.log("server is running " + process.env.NODE_PORT || 9000);
});
