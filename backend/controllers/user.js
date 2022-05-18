const router = require ('express').Router();
const userCtrl = require ("../controllers/user.js");
const auth = require("../middleware/auth");
const authUser = require("../middleware/authUser")
const multer = require("../middleware/multer");


router.post("/signup",userCtrl.signup);
router.post("/login",userCtrl.login);

router.get("/user/profile/:id",auth,userCtrl.getUserProfile);
router.delete("/user/profile/:id",auth,authUser,multer,userCtrl.deleteUserProfile);
router.put ("/user/profile/:id",auth,authUser,multer,userCtrl.modifyProfile);
router.put ("/user/profile/password/:id",auth,authUser,multer,userCtrl.modifyPassword);
router.put ("/user/profile/image/:id",auth,authUser,multer,userCtrl.profilePic);

module.exports = router;