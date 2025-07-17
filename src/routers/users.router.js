const userRouter = require("express").Router(); 
const path = require("node:path")

const userController = require("../controllers/users.controller");
const { v4: uuidv4 } = require('uuid');
const multer = require("multer");

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
    cb(null, path.join("uploads", "profile-picture"))
   },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    const ext = fileName.split(".")[1];
    const savedFile = `${uuidv4()}.${ext}`
    cb(null, savedFile)
  }
})

const profilePicture = multer({ storage })

// userRouter.get("/", userController.listAllUsers );
userRouter.post("/", profilePicture.single("picture"), userController.addNewUser );
// userRouter.delete("/:idStr", userController.deleteUser );
// userRouter.patch("/:idStr", profilePicture.single("picture"), userController.updateUser );
// userRouter.get("/:idStr", userController.userDetail );

module.exports = userRouter;