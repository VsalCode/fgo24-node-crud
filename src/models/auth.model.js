const { users } = require("./users.model")

function validateLogin(req) {
  const notAvailable = users.some((user) => user.email == req.email);
  if (notAvailable) {
    return false;
  }
  return true;
};

module.exports = {
  validateLogin
}