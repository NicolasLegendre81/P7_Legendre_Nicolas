const router = require ('express').Router();
const userCtrl = require ("../controllers/user.js");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");


router.post("/signup",userCtrl.signup);
router.post("/login",userCtrl.login);

router.get("/user/:id",auth,multer,postCtrl.getUserProfile);
router.post("/")