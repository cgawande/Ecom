const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/multerMiddleware");
const userController = require("../controller/userController");
const { checkUserAuth } = require("../middleware/authMiddleware");

router.post("/signup", upload.single("profilePic"), userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/forgotpassword", userController.forgotPassword);
router.post("/resetpassword/:id/:token", userController.resetPassword);
router.post("/changepassword/:id", checkUserAuth, userController.changePassword);
router.patch("/update/:id",checkUserAuth,userController.userDetailsUpdate)
router.post("/logout", checkUserAuth, userController.userLogout);

module.exports = router;
