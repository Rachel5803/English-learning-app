const Dictation = require("../models/Dictation")

const getAllDraftsDictations = async (req, res) => {
    const dictations = await Dictation.find({ sentToStudents:false }).sort({ createdAt: -1 }).populate("class").lean()
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
const getAllSentDictations = async (req, res) => {
    const dictations = await Dictation.find({ sentToStudents:true }).sort({ sentDate: -1 }).populate("class").lean()
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
const getDictationsForSpecificClass = async (req, res) => {
    const {classId}=req.body
    const dictations = await Dictation.find({ class:classId }).lean()
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
const createNewDictation = async (req, res) => {
    const { name, dictationWords, classId,endDate,limitTime} = req.body
    if (!name || !classId) {
        return res.status(400).json({
            error: true,
            massage: 'You need to press name and class',
            data: null
        })
    }
    const dictation = await Dictation.create({ name, dictationWords, class:classId, sentToStudents:false,endDate,sentDate:null,limitTime})
    if (dictation) {
        return res.json({
            error: false,
            message: '',
            data: dictation
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
// const updateWordDictation = async (req, res) => {
//     const { id, words} = req.body
//     const dictation = await Dictation.findOne({ _id: id}).exec()
//     if (!dictation) {
//         return res.status(400).json({ massage: 'Dictation not found' })
//     }
//     dictation.words = [...words];
//     const updateDictation= await dictation.save();
//     res.json(`'${dictation.name}' updated`)
// }
const updateDictation = async (req, res) => {
    const {  _id,name, dictationWords, classId, endDate,limitTime} = req.body
    
     
     
    if (!_id || !name||!classId) {
        return res.status(400).json({
            error: true,
            massage: 'Id, name and class are required',
            data: null
        })
    }
    const dictation = await Dictation.findById(_id).exec()
    if (!dictation) {
        return res.status(400).json({
            error: true,
            massage: 'No dictation found',
            data: null
        })
    }
    dictation.name = name
    dictation.dictationWords = dictationWords
    dictation.class = classId
    dictation.sentToStudents = false
    dictation.endDate = endDate
    dictation.limitTime = limitTime
    const updateDictation= await dictation.save();
    res.json({
        error: false,
        massage: `'${updateDictation.name}' updated`,
        data: updateDictation
    })
}
const deleteDictation = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            massage: 'Id is required',
            data: null
        })
    }
    //כאן תהיה בדיקה אם כבר נשלחו הכתבות לתלמידות
    const dictation = await Dictation.findById(_id).exec()
    if (!dictation) {
        return res.status(400).json({
            error: true,
            massage: 'No dictation found',
            data: null
        })
    }
    const result = await dictation.deleteOne()
    res.json({
        error: false,
        massage: '',
        data: result
    })
}
module.exports = {getAllDraftsDictations,createNewDictation,updateDictation,deleteDictation,getAllSentDictations}
