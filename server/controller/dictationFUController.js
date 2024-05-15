const DictationForUser = require("../models/DictationForUser")
const User = require("../models/User")
const Dictation = require("../models/Dictation")

//צפייה בכל ההכתבות של משתמש מסוים
const getDictationsForSpecificUser = async (req, res) => {
    const { user } = req.body
    const dictations = await DictationForUser.find({ user }).lean()
    if (!dictations.length) {
        return res.status(400).json({
            error: true,
            massage: 'No dictations found',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: dictations
    }) 
}
const getAllDictations = async (req, res) => {
    const dictations = await DictationForUser.find().populate("user", {class:1, name:1}).populate("dictation", {name:1}).lean()
    const dictationsWithClasses=await Promise.all(dictations.map(async dictation=>{
        const grade=await User.populate(dictation.user,"class")
        return { ...dictation,grade};
    }))



    if (!dictationsWithClasses.length) {
        return res.status(400).json({
            error: true,
            massage: 'No dictations found',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: dictationsWithClasses
    })
}
//צפייה בסוג מסויים של הכתבות שנשלחו לתלמידות
const getDictationsFromAllUsersInClass = async (req, res) => {
    const { dictation } = req.body
    const dictationsForUsers = await DictationForUser.find({ dictation })
        .populate("user", {name:1}).lean()
    if (!dictationsForUsers.length) {
        return res.status(400).json({
            error: true,
            massage: 'No dictations found',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: dictationsForUsers
    })
}
const getDictationFUById = async (req, res) => {
    const { id } = req.params
    const dictation = await DictationForUser.findById(id).lean()
    if (!dictation) {
        return res.status(400).json({
            error: true,
            massage: 'No dictation found',
            data: null
        })
    }
    res.json({
        error: false,
        massage: '',
        data: dictation
    })
}
//שליחת הכתבה שנוצרה לכל התלמידות בכיתה
const createNewDictationsForUsers = async (req, res) => {
    const { dictationId, dictationWords, dictationClass, beginDate, endDate } = req.body
    if (!dictationId || !dictationWords || !dictationClass) {
        return res.status(400).json({
            error: true,
            massage: 'You need to press  details dictation',
            data: null
        })
    }
    const users = await User.find({ class: dictationClass }, { _id: 1 }).lean()
    if (!users.length) {
        return res.status(400).json({
            error: true,
            massage: 'No users found',
            data: null
        })
    }
    const dictationsForUsers = await Promise.all(users.map(async (user) => {
        const dictationFU = await DictationForUser.create({
            dictation: dictationId,
            user: user._id, dictationWords, beginDate, endDate
        })
        if (!dictationFU) {
            return res.status(400).json({
                error: true,
                massage: 'Something worng',
                data: null
            })
        }
        return dictationFU
    }))
    if (dictationsForUsers.length) {
        const dictation = await Dictation.findById(dictationId).exec()
        dictation.sentToStudents = true
        const updateDictation = await dictation.save();
        return res.json({
            error: false,
            massage: '',
            data: dictationsForUsers
        })
    }
    else {
        return res.status(400).json({
            error: true,
            massage: 'Something worng',
            data: null
        })
    }
}
//עדכון פרטי הכתבה של תלמידה
const updateDictationForUserDetails = async (req, res) => {
    const { id, user, dictation, dictationWords, dictationWordsAnswers,
        beginDate, endDate, completed, score } = req.body
    if (!id || !dictation || !user) {
        return res.status(400).json({
            error: true,
            massage: 'Id, dictation and user are required',
            data: null
        })
    }
    const dictationForUser = await DictationForUser.findById(id).exec()
    if (!dictationForUser) {
        return res.status(400).json({
            error: true,
            massage: 'No dictation found',
            data: null
        })
    }
    if (dictationForUser.dictationWordsAnswers.length == 0) {
        dictationForUser.dictationWords = dictationWords
    }
    dictationForUser.user = user
    dictationForUser.dictation = dictation
    dictationForUser.dictationWordsAnswers = dictationWordsAnswers
    dictationForUser.beginDate = beginDate
    dictationForUser.endDate = endDate
    dictationForUser.completed = completed
    dictationForUser.score = score
    const updateDictation = await dictationForUser.save();
    res.json({
        error: false,
        massage: '',
        data: updateDictation
    })
}



module.exports = {getAllDictations, getDictationsForSpecificUser, getDictationsFromAllUsersInClass
                   ,getDictationFUById, createNewDictationsForUsers, updateDictationForUserDetails
}
