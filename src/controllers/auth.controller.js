const { constants: http } = require("http2");
const { validateLogin } = require("../models/auth.model");
const { createNewUser, isEmailAvailable } = require("../models/users.model");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.register = function (req, res) {
  const isAvailable = isEmailAvailable(req.body);
  if (!isAvailable) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "email already registered!",
    });
  }

  const status = createNewUser(req.body);
  if (!status) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: true,
      message: "failed to register!",
    });
  }

  return res.status(http.HTTP_STATUS_CREATED).json({
    success: true,
    message: "register successfully!",
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.login = function (req, res) {
  const exist = validateLogin(req.body);
  if (!exist) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "your account is not found!",
    });
  }

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "login successfully!, welcome back!",
  });
};
