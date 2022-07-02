const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports.validateUserJWTToken = function (user_token) {
  if (!user_token) return false;
  if (user_token.length <= 4) return false;
  let token = user_token.substr(4, user_token.length);
  try {
    const verified = jwt.verify(token, config.secret);
    if (!verified || !verified.data) return false;
    return verified.data;
  } catch (error) {
    return false;
  }
};
