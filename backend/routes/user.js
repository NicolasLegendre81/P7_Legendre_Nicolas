const router = require ('express').Router();
const userCtrl = require ("../controllers/user.js");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");


router.post("/signup",userCtrl.signup);
router.post("/login",userCtrl.login);

router.get("/user/profile/:id",auth,userCtrl.getUserProfile);
router.post("/user/profile/:id",auth,multer,userCtrl.deleteUserProfile);
router.put ("/user/profile/:id",auth,multer,userCtrl.modifyProfile);
//router.delete(/user/profile/:id",auth,multer,userCtrl.deleteProfile)

module.exports = router;