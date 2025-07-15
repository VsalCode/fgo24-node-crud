const userRouter = require("express").Router(); 
const userController = require("../controllers/users.controller");

userRouter.get("/", userController.listAllUsers );
userRouter.post("/", userController.addNewUser );
userRouter.delete("/:idStr", userController.deleteUser );
userRouter.patch("/:idStr", userController.updateUser );

module.exports = userRouter;