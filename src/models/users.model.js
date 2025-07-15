const users = [];

function findUserByName(query) {
  let filtered = users.filter(x => x.name.includes(query))
  return filtered;
};

function isEmailAvailable(req) {
  const notAvailable = users.some((user) => user.email == req.email);
  if (notAvailable) {
    return false;
  }
  return true;
};

function createNewUser(req) {
  users.push({
    id: users.length + 1,
    name: req.name,
    email: req.email,
    password: req.password,
  });
  return true;
};

function getUserIndex(userId){
  let idx = users.findIndex((user) => {
    return user.id == userId;
  });
  return idx
}

function deleteUserById(idx) {
  users.splice(idx, 1)
  return true;
};

function updateUserById(idx, req) {
  
  let oldName = users[idx].name
  let oldEmail = users[idx].email
  let oldPassword = users[idx].password
  
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

  users[idx].name = newName
  users[idx].email = newEmail
  users[idx].password = newPassword

  return true;
};

module.exports = {
  users,
  findUserByName,
  isEmailAvailable,
  createNewUser,
  getUserIndex,
  deleteUserById,
  updateUserById
}