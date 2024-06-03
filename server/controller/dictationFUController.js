const DictationForUser = require("../models/DictationForUser")
const User = require("../models/User")
const Dictation = require("../models/Dictation")

//צפייה בכל ההכתבות של משתמש מסוים
const getAllDictationsForSpecificUser = async (req, res) => {
    const { user } = req.body
    const dictations = await DictationForUser.find({ user }).populate("dictation", {name:1, limitTime:1}).lean()
    if (!dictations.length) {
        return res.status(400).json({
            error: true,
            massage: 'אין הכתבות קיימות למשתמש זה',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: dictations
    }) 
}
//צפייה בכל ההכתבות שלא נעשו עבור משתמש מסויים
const getNotCompletedDictationsForSpecificUser = async (req, res) => {
    const { user } = req.body
    const currentDate = new Date();
    const dictations = await DictationForUser.find({ user,completed:false,endDate: { $gte: currentDate } }).populate("dictation", {name:1, limitTime:1}).lean()
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
//צפייה בכל ההכתבות שנעשו עי משתמש מסויים
const getCompletedDictationsForSpecificUser = async (req, res) => {
    const { user } = req.body
    const currentDate = new Date();
    const dictations = await DictationForUser.find({ user, $or: [
        { completed: true },
        { endDate: { $lt: currentDate } }
    ] }).populate("dictation", {name:1, limitTime:1}).lean()
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
    const dictations = await DictationForUser.find().populate("user", {class:1, name:1}).populate("dictation", {name:1, limitTime:1}).lean()
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
    const { dictationId, dictationWords, dictationClass,  endDate,limitTime } = req.body
    if (!dictationId || !dictationWords || !dictationClass|| !endDate|| !limitTime) {
        return res.status(400).json({
            error: true,
            massage: 'יש למלא את כל פרטי ההכתבה לפני השליחה',
            data: null
        })
    }
    const beginDate = new Date();
    const users = await User.find({ class: dictationClass }, { _id: 1 }).lean()
    if (!users.length) {
        return res.status(400).json({
            error: true,
            massage: 'לא נמצאו תלמידים לכיתה זו',
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
        const currentDate = new Date();
        dictation.sentToStudents = true
        dictation.sentDate =currentDate 
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
const updateDictationForSpecificUser = async (req, res) => {
    const { _id, dictationWordsAnswers,endDate, completed, score } = req.body
    if (!_id ) {
        return res.status(400).json({
            error: true,
            massage: 'Id, dictation and user are required',
            data: null
        })
    }
    const dictationForUser = await DictationForUser.findById(_id).exec()
    if (!dictationForUser) {
        return res.status(400).json({
            error: true,
            massage: 'No dictation found',
            data: null
        })
    }
    if (dictationForUser.dictationWordsAnswers.length == 0) {
        dictationForUser.dictationWordsAnswers = dictationWordsAnswers
    }
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

const updateDictationForAllUsers = async (req, res) => {
    const { endDate,classId ,dictation} = req.body
    if (!endDate||!classId||!dictation) {
        return res.status(400).json({
            error: true,
            massage: 'Id, class and endDate are required',
            data: null
        })
    }
    const dictationsForUsers = await DictationForUser.find({ dictation }).exec()
    if (!dictationsForUsers) {
        return res.status(400).json({
            error: true,
            massage: 'No dictation found',
            data: null
        })
    }
    const dct = await Dictation.findById(dictation).exec()
    if (!dct) {
        return res.status(400).json({
            error: true,
            massage: 'No dictation found',
            data: null
        })
    }
    dct.endDate = endDate
    const updateDct = await dct.save();
    const dictationsForUsersUpdate = await Promise.all(dictationsForUsers.map(async (dictFU) => {
        dictFU.endDate=endDate
        const dictationFU = await dictFU.save()
        if (!dictationFU) {
            return res.status(400).json({
                error: true,
                massage: 'Something worng',
                data: null
            })
        }
        return dictationFU
    }))
    
    res.json({
        error: false,
        massage: '',
        data: dictationsForUsersUpdate
    })
}



module.exports = {getAllDictations, getAllDictationsForSpecificUser, getNotCompletedDictationsForSpecificUser,getCompletedDictationsForSpecificUser,getDictationsFromAllUsersInClass,updateDictationForAllUsers
                   ,getDictationFUById, createNewDictationsForUsers, updateDictationForSpecificUser
}
