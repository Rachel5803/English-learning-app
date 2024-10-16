const Dictation = require("../models/Dictation")
const DictationForUser = require("../models/DictationForUser")
const getAllDraftsDictations = async (req, res) => {
    const dictations = await Dictation.find({ sentToStudents:false }).sort({ createdAt: -1 }).populate("class").lean()
    if (!dictations.length) {
        return res.status(400).json({
            error: true,
            massage: 'No drafts found',
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
            massage: 'No dictations sent to students were found.',
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
    const dictationsFU = await DictationForUser.find({ dictation: _id }).exec()
    if (dictationsFU.length) {
        const deleteDictations = await Promise.all(dictationsFU.map(async (dictFU) => {
            const deleteDictFU = await dictFU.deleteOne()
            if (!deleteDictFU) {
                return res.status(400).json({
                    error: true,
                    massage: 'Something worng',
                    data: null
                })
            }
            return deleteDictFU
        }))
        if (!deleteDictations) {

            return res.status(400).json({
                error: true,
                massage: 'Something worng',
                data: null
            })

        }
    }
    //
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
