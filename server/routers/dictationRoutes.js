const express = require("express")
const router = express.Router()
const dictationController = require("../controller/dictationController")
router.get("/", dictationController.getAllDraftsDictations)
//router.get("/:id", dictationController.getUserById)
router.post("/", dictationController.createNewDictation)
router.delete("/", dictationController.deleteDictation)
router.put("/", dictationController.updateDictation)


module.exports = router