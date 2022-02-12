const router = require ('express').Router();
const auth = require("../middleware/auth");
const authpost = require ("../middleware/authpost");
const postCtrl = require ("../controllers/posts");
const multer = require("../middleware/multer");

router.get("/", auth,postCtrl.getAllPosts);
router.post("/",auth,multer,postCtrl.createPost);
router.put("/:id",auth,authpost,multer,postCtrl.modifyPost);
router.delete("/:id",auth,authpost,multer,postCtrl.deletePost);

module.exports = router;

 