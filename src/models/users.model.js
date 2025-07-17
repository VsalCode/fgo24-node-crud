const fs = require('fs').promises;
const path = require("node:path");

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
  if (req.profile) {
    users.push({
      id: users.length + 1,
      name: req.name,
      email: req.email,
      password: req.password,
      profile: req.profile,
    });

    return true
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

async function updateUserByIndex(idx, req) {
  let oldProfilePicture = users[idx].profile;

  if (req.profile) {
    const newProfilePicture = req.profile;

    if (oldProfilePicture) {
      const oldFilePath = path.join('uploads', 'profile-picture', oldProfilePicture);
      
      try {
        await fs.access(oldFilePath);
        await fs.unlink(oldFilePath);
        console.log('File lama berhasil dihapus');
      } catch (err) {
        console.log("gagal hapus image")
        console.log(err.message)
      }
    }

    users[idx].profile = newProfilePicture;
  }

  users[idx].name = req.name ;
  users[idx].email = req.email ;
  users[idx].password = req.password;

  return true;
}


module.exports = {
  users,
  findUserByName,
  isEmailAvailable,
  createNewUser,
  getUserIndex,
  deleteUserById,
  updateUserByIndex,
};
