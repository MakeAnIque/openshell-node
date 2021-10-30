const JsonwebToken = require("../jwt/token");

async function verifyToken(req, res, next) {
  try {
    const jsonwebTken = new JsonwebToken();

    const token = req.headers["authorization"];

    if (!token) {
      throw new Error("Unauthorized");
    }

    await jsonwebTken.verifyToken(token);

    next();
  } catch (jwtTokenVerificationError) {
    res.status(401).end({
      status: false,
      message: "Instance Unauthorized.",
    });
  }
}

module.exports = verifyToken;
