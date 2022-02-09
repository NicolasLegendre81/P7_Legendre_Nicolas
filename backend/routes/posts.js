const router = require ('express').Router();
const auth = require("../middleware/auth");
const postCtrl = require ("../controllers/posts");
const multer = require("../middleware/multer");

router.get("/", auth,postCtrl.getAllPosts);
router.post("/",auth,multer,postCtrl.createPost);
router.put("/:id",auth,multer,postCtrl.modifyPost);
// router.delete("/:id",auth,multer,postCtrl.deletePost);

module.exports = router;

 