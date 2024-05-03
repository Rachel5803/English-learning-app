const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")

router.use(verifyJWT)
router.use(verifyAdmin)

router.get("/", userController.getUsers)
router.get("/class", userController.getUsersForSpecificClass)
router.get("/:id", userController.getUserById)
router.post("/", userController.createNewUser)
 router.delete("/", userController.deleteUser)
router.put("/", userController.updateUser)


module.exports = router