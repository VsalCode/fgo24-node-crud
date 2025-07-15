const { constants: http } = require("http2");
const userModel = require("../models/users.model");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.listAllUsers = function (_, res) {
  const users = userModel.showAllUsers();

  if (users) {
    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: " success to show list all users!",
      results: users,
    });
  }

  return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "failed to show list all users!",
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.addNewUser = function (req, res) {
  const isAvailable = userModel.isEmailAvailable(req.body);
  if (!isAvailable) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "email already registered!",
    });
  }

  const status = userModel.createNewUser(req.body);

  if (!status) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: true,
      message: "failed to added new user!",
    });
  }

  return res.status(http.HTTP_STATUS_CREATED).json({
    success: true,
    message: "new user added successfully!",
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.deleteUser = function (req, res) {
  const { idStr } = req.params;
  const id = parseInt(idStr);

  const status = userModel.isUserIdExist(id);
  if (!status) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `user with id: ${id} doesnt exist!`,
    });
  }

  const isDeleted = userModel.deleteUserById(id);
  if (!isDeleted) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `failed to delete user with id: ${id} !`,
    });
  }

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: `success to delete user with id: ${id} !`,
  });
};
