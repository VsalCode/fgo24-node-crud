const userRouter = require("express").Router(); 
const userController = require("../controllers/users.controller");

userRouter.get("/", userController.listAllUsers );
userRouter.post("/", userController.addNewUser );

module.exports = userRouter;