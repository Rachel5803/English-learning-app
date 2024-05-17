const express = require("express")
const router = express.Router()
const dictationFUController = require("../controller/dictationFUController")
router.get("/", dictationFUController.getAllDictations)
router.get("/user", dictationFUController.getDictationsForSpecificUser)
router.get("/class", dictationFUController.getDictationsFromAllUsersInClass)
router.get("/:id", dictationFUController.getDictationFUById)
router.post("/", dictationFUController.createNewDictationsForUsers)
router.put("/user", dictationFUController.updateDictationForSpecificUser)
router.put("/", dictationFUController.updateDictationForAllUsers)


module.exports = router