const Users = [];

exports.showAllUsers = function () {
  return Users;
};

exports.handleNewUser = function (req) {
  if (Users.length != 0) {
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
  } else {
    Users.push({
      id: Users.length + 1,
      name: req.name,
      email: req.email,
      password: req.password,
    });
    return true;
  }
};

exports.handleDeleteUser = function (id) {
  const exist = Users.some((x) => x.id == id);

  if (exist) {
    let idx = id - 1;
    delete Users[idx];
    return true;
  }
  return false;
};
