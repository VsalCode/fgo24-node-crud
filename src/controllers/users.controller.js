const { constants: http } = require("http2");
const userModel = require("../models/users.model");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.listAllUsers = function (req, res) {
  const { search, sortby, page = 1, pageSize = 10 } = req.query;

  const pageNum = Math.max(1, parseInt(page)) || 1;
  const pageSizeNum = Math.max(1, parseInt(pageSize)) || 10;

  const result = userModel.findUserByName(search, sortby, pageNum, pageSizeNum);

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "Success to show list all users!",
    results: result.data,
    page: pageNum,
    pageSize: pageSizeNum,
    total: result.total,
    totalPages: result.totalPages,
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.addNewUser = function (req, res) {
  const { name, email, password } = req.body
  
  const isAvailable = userModel.isEmailAvailable(req.body);
  if (!isAvailable) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "email already registered!",
    });
  }

  const sendedFormat = {
    name: name || email.split("@")[0],
    email: email,
    password: password,
    profile: req?.file?.filename || null
  }

  const status = userModel.createNewUser(sendedFormat);

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

  const index = userModel.getUserIndex(id);
  if (index == -1) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `user with id: ${id} doesnt exist!`,
    });
  }

  const isDeleted = userModel.deleteUserById(index);
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

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.updateUser = function (req, res) {
  const { idStr } = req.params;
  const id = parseInt(idStr);

  const index = userModel.getUserIndex(id);
  if (index == -1) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `user with id: ${id} doesnt exist!`,
    });
  }

  const { name, email, password } = req.body
  const sendedFormat = {
    name: name || email.split("@")[0],
    email: email,
    password: password,
    profile: req?.file?.filename || null
  }

  const isUpdated = userModel.updateUserById(index, sendedFormat);
  if (!isUpdated) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `failed to updated user with id: ${id} !`,
    });
  }

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: `success to updated user with id: ${id} !`,
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.userDetail = function (req, res) {
  const { idStr } = req.params;
  const id = parseInt(idStr);

  const index = userModel.getUserIndex(id);
  if (index == -1) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `user with id: ${id} doesnt exist!`,
    });
  }

  return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
    success: true,
    message: `retrieve user with id: ${id} successfully!`,
    results: userModel.users[index],
  });
};
