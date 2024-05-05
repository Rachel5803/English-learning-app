const express = require("express")
const router = express.Router()
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix   +"-" + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
const userController = require("../controller/userController")

const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")

router.use(verifyJWT)
router.use(verifyAdmin)


router.get("/", userController.getUsers)
router.get("/class", userController.getUsersForSpecificClass)
router.get("/:id", userController.getUserById)
router.post("/" , upload.single('image'), userController.createNewUser)
 router.delete("/", userController.deleteUser)
router.put("/" , upload.single('image'), userController.updateUser)


module.exports = router