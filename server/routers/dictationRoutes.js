const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const dictationController = require("../controller/dictationController")


router.use(verifyJWT)
router.get("/", dictationController.getAllDraftsDictations)
router.get("/sent", dictationController.getAllSentDictations)

router.use(verifyAdmin)
router.post("/", dictationController.createNewDictation)
router.delete("/", dictationController.deleteDictation)
router.put("/", dictationController.updateDictation)


module.exports = router