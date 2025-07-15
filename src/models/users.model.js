const Users = [];

exports.showAllUsers = function () {
  return Users;
};

exports.isEmailAvailable = function (req) {
  const notAvailable = Users.some((user) => user.email == req.email);
  if (notAvailable) {
    return false;
  }
  return true;
};

exports.createNewUser = function (req) {
  Users.push({
    id: Users.length + 1,
    name: req.name,
    email: req.email,
    password: req.password,
  });
  return true;
};

exports.isUserIdExist = function (idParams) {
  const exist = Users.some((user) => user.id == idParams);
  if (exist) {
    return true;
  }
  return false;
};

exports.deleteUserById = function (id) {
  let idx = Users.findIndex((user) => {
    return user.id == id;
  });

  if(!idx) {
    return false;
  }

  Users.splice(idx, 1)
  return true;
};

exports.updateUserById = function (id, req) {
  let idx = Users.findIndex((user) => {
    return user.id == id;
  });

  if (req.name != "") {
    Users[idx].name = req.name;
  }
  if (req.email != "") {
    Users[idx].email = req.email;
  }
  if (req.password != "") {
    Users[idx].password = req.password;
  }

  return true;
};
