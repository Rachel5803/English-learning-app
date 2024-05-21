const express = require("express")
const router = express.Router()
const dictationFUController = require("../controller/dictationFUController")
router.get("/", dictationFUController.getAllDictations)
router.post("/user", dictationFUController.getAllDictationsForSpecificUser)
router.post("/user/not/complete", dictationFUController.getNotCompletedDictationsForSpecificUser)
router.post("/user/complete", dictationFUController.getCompletedDictationsForSpecificUser)
router.post("/class", dictationFUController.getDictationsFromAllUsersInClass)
router.get("/:id", dictationFUController.getDictationFUById)
router.post("/", dictationFUController.createNewDictationsForUsers)
router.put("/user", dictationFUController.updateDictationForSpecificUser)
router.put("/", dictationFUController.updateDictationForAllUsers)


module.exports = router