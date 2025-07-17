const fs = require('fs');
const path = require('path');

const users = [];

function findUserByName(query, sort, page = 1, pageSize = 10) {
  const pageNum = Math.max(1, parseInt(page)) || 1;
  const pageSizeNum = Math.max(1, parseInt(pageSize)) || 10;

  let filtered = users.filter((user) =>
    user.name.toLowerCase().includes((query || "").toLowerCase())
  );

  switch (sort) {
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "email":
      filtered.sort((a, b) => a.email.localeCompare(b.email));
      break;
  }

  const startIndex = (pageNum - 1) * pageSizeNum;
  const endIndex = Math.min(startIndex + pageSizeNum, filtered.length);
  const paginated = filtered.slice(startIndex, endIndex);

  return {
    data: paginated,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / pageSizeNum),
  };
}

function isEmailAvailable(req) {
  const notAvailable = users.some((user) => user.email == req.email);
  if (notAvailable) {
    return false;
  }
  return true;
}

function createNewUser(req) {
  if (req.profile != null) {
    users.push({
      id: users.length + 1,
      name: req.name,
      email: req.email,
      password: req.password,
      profile: req.profile,
    });
  }

   users.push({
      id: users.length + 1,
      name: req.name,
      email: req.email,
      password: req.password
    });

  return true;
}

function getUserIndex(userId) {
  let idx = users.findIndex((user) => {
    return user.id == userId;
  });
  return idx;
}

function deleteUserById(idx) {
  users.splice(idx, 1);
  return true;
}

function updateUserById(idx, req) {
  
  let oldName = users[idx].name;
  let oldEmail = users[idx].email;
  let oldPassword = users[idx].password;
  let oldProfilePicture = users[idx].profile;

  let newEmail = oldEmail;
  let newName = oldName;
  let newPassword = oldPassword;
  let newProfilePicture = oldProfilePicture;

  if (req.name != "" && req.name != undefined) {
    newName = req.name;
  }

  if (req.email != "" && req.email != undefined) {
    newEmail = req.email;
  }

  if (req.password != "" && req.password != undefined) {
    newPassword = req.password;
  }

  if (req.file) {
    newProfilePicture = req.file.filename;

    if (oldProfilePicture) {
      const oldFilePath = path.join('uploads', 'profile-picture', oldProfilePicture);
      
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error('Gagal menghapus file lama:', err);
        } else {
          console.log('File lama berhasil dihapus');
        }
      });
    }
  }

  users[idx].name = newName;
  users[idx].email = newEmail;
  users[idx].password = newPassword;
  users[idx].profile = newProfilePicture;

  return true;
}


module.exports = {
  users,
  findUserByName,
  isEmailAvailable,
  createNewUser,
  getUserIndex,
  deleteUserById,
  updateUserById,
};
