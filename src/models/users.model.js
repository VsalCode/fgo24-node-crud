const Users = [];

exports.showAllUsers = function () {
  return Users;
};

exports.isEmailAvailable = function(req){
  const notAvailable =  Users.some(user => user.email == req.email)
  if (notAvailable){
    return false
  }
  return true
}

exports.createNewUser = function(req) {
    Users.push({
      id: Users.length + 1,
      name: req.name,
      email: req.email,
      password: req.password,
    });
    return true;
};

exports.isUserIdExist = function(idParams){
  const exist = Users.some(user => user.id == idParams )
  if(exist) {
    return true
  }
  return false
}

exports.deleteUserById = function(id){
  let idx = id - 1

  if(idx < 0){
    return false
  }

  delete Users[idx]
  return true
}