const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/multerMiddleware");
const userController = require("../controller/userController");
const { checkUserAuth } = require("../middleware/authMiddleware");

router.post("/signup", upload.single("profilePic"), userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/forgotpassword", userController.forgotPassword);
router.post("/resetpassword", userController.resetPassword);
router.post("/changepassword", checkUserAuth, userController.changePassword);
router.post("/logout", checkUserAuth, userController.userLogout);

module.exports = router;
