const fse = require("fs-extra");
const app_root_path = require("app-root-path");
const path = require("path");

function readConfigFile() {
  const configString = fse.readFileSync(
    path.join(app_root_path.path, "src", "config.json")
  );

  if (!configString) {
    return false;
  }

  return (config = JSON.parse(configString));
}

module.exports = readConfigFile;
