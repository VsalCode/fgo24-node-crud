const Users = [];

exports.showAllUsers = function () {
  return Users;
};

exports.handleNewUser = function (req) {
  if (Users.length > 0) {
    Users.forEach((x) => {
      if (x.email == req.email && x.password == req.password) {
        Users.push({
          id: Users.length + 1,
          name: req.name,
          email: req.email,
          password: req.password,
        });
        return true;
      }
      return false;
    });
  }
  Users.push({
    id: Users.length + 1,
    name: req.name,
    email: req.email,
    password: req.password,
  });
  return true
};
