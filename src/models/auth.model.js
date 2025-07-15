const { users } = require("./users.model")

function validateLogin(req) {
  const exist = users.some((user) => user.email == req.email);
  if (exist) {
    return true;
  }
  return false;
};

module.exports = {
  validateLogin
}