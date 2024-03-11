const express = require("express")
const router = express.Router()
// const verifyJWT=require("../middleware/verifyJWT")
const dictationController = require ("../controller/firstController/dictationController")
// router.use(verifyJWT)
router.get("/",dictationController.getDictationsForSpecificGrade )
router.post("/", dictationController.createNewDictation)
router.put("/", dictationController.updateWordDictation)

module.exports = router

