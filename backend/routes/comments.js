const router = require ('express').Router();
const auth = require("../middleware/auth");
const commentsCtrl =require("../controllers/comments");

// router.get("/", auth,commentsCtrl.getComs,);//accés a tout les commentaires
router.post("/",auth,commentsCtrl.createCom);

module.exports = router;