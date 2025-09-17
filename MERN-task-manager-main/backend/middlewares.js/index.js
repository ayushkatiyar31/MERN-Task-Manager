const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // ✅ Load env variables here

exports.verifyAccessToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(400).json({ status: false, msg: "Token not found" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ use JWT_SECRET, not ACCESS_TOKEN_SECRET
  } catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }

  try {
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};
