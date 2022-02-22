const router = require ('express').Router();
const auth = require("../middleware/auth");
const authpost = require ("../middleware/authpost");
const postCtrl = require ("../controllers/posts");
const multer = require("../middleware/multer");

router.get("/", auth,postCtrl.getAllPosts,);//accés a tout les posts
router.post("/",auth,multer,postCtrl.createPost);//création de post depuis le fil d'actualité
router.put("/:id",auth,authpost,multer,postCtrl.modifyPost);//modification de post depuis le fil d'actualité
router.delete("/:id",auth,authpost,multer,postCtrl.deletePost);//suppression depuis le fil d'actualité
router.get("/user/:id",auth,postCtrl.getPostsUser);//reception des posts d'un utilisateur
router.post("/user/:id",auth,multer,postCtrl.createPost);//création d'un post depuis le profil
router.post("/share/:id",auth,multer,postCtrl.sharePost);
router.put("/user/:id",auth,authpost,multer,postCtrl.modifyPost);//modification d'un post depuis le profil
router.delete("/user/:id",auth,authpost,multer,postCtrl.deletePost);//supression d'un post depuis le profil

module.exports = router;

 