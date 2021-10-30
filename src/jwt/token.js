const jsonwebtoken = require("jsonwebtoken");

const readConfigFile = require("../utils/config-file.util");

class JsonwebToken {
  config;
  constructor() {
    this.init();
  }

  init() {
    this.config = readConfigFile();
  }

  async verify(token) {
    return await jsonwebtoken.verify(token, process.env.SECRET_KEY);
  }
}

module.exports = new JsonwebToken();
