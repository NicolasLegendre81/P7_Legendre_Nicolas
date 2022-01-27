const router = require ('express').Router();
const postCtrl = require ("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.get("/",auth,postCtrl.getAll);
router.post("/",auth,multer,postCtrl.createPost);
router.put("/:id",auth,multer,postCtrl.modifyPost);
router.delete("/:id",auth,multer,postCtrl.deletePost);

module.exports = router;

 