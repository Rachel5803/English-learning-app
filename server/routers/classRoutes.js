const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()

router.use(verifyJWT)
router.use(verifyAdmin) 

const classController=require("../controller/classController")
router.get("/",classController.getClasses)
router.get("/schoolYear",classController.getClassesByYear)
//router.get("/:id", classController.getClasses)
router.post("/",classController.createNewClass)
router.delete("/",classController.deleteClass)
router.put("/",classController.updateClass)
module.exports = router