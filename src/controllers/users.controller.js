const { constants: http } = require("http2");
const userModel = require("../models/users.model")

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
exports.listAllUsers = function(_, res){
  const users = userModel.showAllUsers()

  if(users){
    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: " success to show list all users!",
      results: users
    });
  }
   
  return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "failed to show list all users!",
    });
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
exports.addNewUser = function(req, res){
  const status = userModel.handleNewUser(req.body);

  if(!status){
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "failed to add new user!"
    });  
  }

  return res.status(http.HTTP_STATUS_CREATED).json({
      success: true,
      message: "new user added successfully!"
    });
}
