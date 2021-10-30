const jsonwebtoken = require("jsonwebtoken");

const readConfigFile = require("../utils/config-file.util");

class JsonwebToken {
  config = null;
  constructor() {
    this.init();
  }

  init() {
    this.config = readConfigFile();
  }

  async verify(token) {
    return await jsonwebtoken.verify(token, this.config.key);
  }
}

module.exports = new JsonwebToken();
