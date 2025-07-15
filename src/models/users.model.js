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

exports.getUserIndex = function(userId){
  let idx = Users.findIndex((user) => {
    return user.id == userId;
  });
  return idx
}

exports.deleteUserById = function (idx) {
  Users.splice(idx, 1)
  return true;
};

exports.updateUserById = function (idx, req) {
  
  let oldName = Users[idx].name
  let oldEmail = Users[idx].email
  let oldPassword = Users[idx].password
  
  let newEmail = oldEmail
  let newName = oldName
  let newPassword = oldPassword

  if (req.name != "" || req.name != undefined) {
    newName = req.name
  }

  if (req.email != "" || req.email != undefined) {
    newEmail = req.email
  }
  if (req.password != "" || req.password != undefined ) {
    newPassword = req.password
  }

  Users[idx].name = newName
  Users[idx].email = newEmail
  Users[idx].password = newPassword

  return true;
};
