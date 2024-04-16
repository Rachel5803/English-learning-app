const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
router.get("/", userController.getUsers)
router.get("/class", userController.getUsersForSpecificClass)
router.get("/:id", userController.getUserById)
router.post("/", userController.createNewUser)
 router.delete("/", userController.deleteUser)
router.put("/", userController.updateUser)


module.exports = router