const router = require ('express').Router();
const auth = require("../middleware/auth");
const authcoms = require('../middleware/authcoms')
const commentsCtrl =require("../controllers/comments");

router.get("/:id",auth,commentsCtrl.getComs);//accés a tout les commentaires
router.post("/",auth,commentsCtrl.createCom);
router.delete("/:id",auth,authcoms,commentsCtrl.deleteComs);
router.put("/:id",auth,authcoms,commentsCtrl.modifyComs);

module.exports = router;