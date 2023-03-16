const express=require("express")
const router=express.Router()

const {upload}=require("../middleware/multerMiddleware")
const userController=require("../controller/userController")
const {checkUserAuth} =require("../middleware/authMiddleware")

router.post("/signup",upload.single("profilePic"),userController.userSignup)
router.post("/login",userController.userLogin)
router.post("/logout",checkUserAuth,userController.userLogout)

module.exports=router