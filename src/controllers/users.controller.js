const { constants: http } = require("http2");
const { user } = require("../models");

// /**
//  * @param {import("express").Request} req
//  * @param {import("express").Response} res
//  */
// exports.listAllUsers = function (req, res) {
//   const { search, sortby, page = 1, pageSize = 10 } = req.query;

//   const pageNum = Math.max(1, parseInt(page)) || 1;
//   const pageSizeNum = Math.max(1, parseInt(pageSize)) || 10;

//   const result = userModel.findUserByName(search, sortby, pageNum, pageSizeNum);

//   return res.status(http.HTTP_STATUS_OK).json({
//     success: true,
//     message: "Success to show list all users!",
//     results: result.data,
//     page: pageNum,
//     pageSize: pageSizeNum,
//     total: result.total,
//     totalPages: result.totalPages,
//   });
// };

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.addNewUser = async function (req, res) {
  try {
    const { fullname, email, password } = req.body;

    const validate = await user.findOne({ where: { email: email } });
    if (validate !== null) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "user email already registered!",
      });
    }

    const createdUser = await user.create({
      fullname: fullname || email.split("@")[0],
      email: email,
      password: password,
      picture: req?.file?.filename || null,
    });

    return res.status(http.HTTP_STATUS_CREATED).json({
      success: true,
      message: "new user added successfully!",
      results: createdUser,
    });
  } catch (err) {
    console.log(err);

    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "failed to add new user!",
      errors: err.message,
    });
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.deleteUser = async function (req, res) {
  try {
    const { idStr } = req.params;
    const id = parseInt(idStr);

    const status = await user.destroy({
      where: { id: id },
    });

    console.log(status);

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: `success to delete user with id ${id}!`,
    });
  } catch (err) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "failed to delete user",
      errors: err.message,
    });
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
exports.updateUser = async function (req, res) {
  try {
    const { idStr } = req.params;
    const id = parseInt(idStr);
    const { fullname, email, password } = req.body;

    const updatedUser = await user.update({
      fullname: fullname || email.split("@")[0],
      email: email,
      password: password,
      picture: req?.file?.filename || null,
    }, {
      where: { id: id },
    })

    if(updatedUser == 0){
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "user doesnt exist!",
      })  
    }

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "user updated successfully!",
      results: updatedUser
    })

  } catch (err) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "failed to update user!",
      errors: err.message
    })
  }
};

// /**
//  * @param {import("express").Request} req
//  * @param {import("express").Response} res
//  * @returns
//  */
// exports.userDetail = function (req, res) {
//   const { idStr } = req.params;
//   const id = parseInt(idStr);

//   const index = userModel.getUserIndex(id);
//   if (index == -1) {
//     return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
//       success: false,
//       message: `user with id: ${id} doesnt exist!`,
//     });
//   }

//   return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
//     success: true,
//     message: `retrieve user with id: ${id} successfully!`,
//     results: userModel.users[index],
//   });
// };
