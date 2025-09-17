const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET not defined in .env");
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

module.exports = {
  createAccessToken,
};
