const Class = require("../models/Class")
const User = require("../models/User")
const DictationForUser = require("../models/DictationForUser")
const Dictation = require("../models/Dictation")
const getClasses = async (req, res) => {
    const classes = await Class.find({}).sort({ active: -1 }).lean()
    if (!classes.length) {
        return res.status(400).json({
            error: true,
            massage: 'No classes found',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: classes
    })
}
const getActiveClasses = async (req, res) => {
    const classes = await Class.find({ active: true }).lean()
    if (!classes.length) {
        return res.status(400).json({
            error: true,
            massage: 'No classes found',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: classes
    })
}
const getClassesByYear = async (req, res) => {
    const { schoolYear } = req.body
    const classes = await Class.find({ schoolYear }).lean()
    if (!classes.length) {
        return res.status(400).json({
            error: true,
            massage: 'No classes found',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: classes
    })
}
const createNewClass = async (req, res) => {
    const { school, grade, gradeNumber, schoolYear, active } = req.body
    if (!school || !grade || !gradeNumber || !schoolYear) {
        return res.status(400).json({
            error: true,
            massage: 'You need to press school, grade ,grade number and school year',
            data: null
        })
    }
    const checkDouble = await Class.findOne({ school, grade, gradeNumber, schoolYear, active }).lean()
    if (checkDouble) {
        return res.status(400).json({
            error: true,
            massage: 'The class exists in the system',
            data: null
        })

    }
    const classCreate = await Class.create({ school, grade, gradeNumber, schoolYear, active })
    if (classCreate) {
        return res.json({
            error: false,
            message: '',
            data: classCreate
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
const updateClass = async (req, res) => {
    const { _id, school, grade, gradeNumber, schoolYear, active } = req.body
    if (!_id || !school || !grade || !gradeNumber || !schoolYear) {
        return res.status(400).json({
            error: true,
            massage: 'Id, school, grade ,grade number and school year are required',
            data: null
        })
    }
    const foundClass = await Class.findById(_id).exec()
    if (!foundClass) {
        return res.status(400).json({
            error: true,
            massage: 'No class found',
            data: null
        })
    }
    if (foundClass.active != active) {
        const users = await User.find({ class: _id }, { password: 0 }).exec()
        if (users.length) {
            const updateUsers = await Promise.all(users.map(async (user) => {
                user.active = active
                const updateUser = await user.save()
                if (!updateUser) {
                    return res.status(400).json({
                        error: true,
                        massage: 'Something worng',
                        data: null
                    })
                }
                return updateUser
            }))
            if (!updateUsers) {

                return res.status(400).json({
                    error: true,
                    massage: 'Something worng',
                    data: null
                })

            }
        }
    }
    foundClass.school = school
    foundClass.grade = grade
    foundClass.gradeNumber = gradeNumber
    foundClass.schoolYear = schoolYear
    foundClass.active = active
    const updateClass = await foundClass.save();
    res.json({
        error: false,
        massage: `'${updateClass.name}' updated`,
        data: updateClass
    })
}
const deleteClass = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            massage: 'Id is required',
            data: null
        })
    }
    const foundClass = await Class.findById(_id).exec()
    if (!foundClass) {
        return res.status(400).json({
            error: true,
            massage: 'No class found',
            data: null
        })
    }

    const users = await User.find({ class: _id }, { password: 0 }).exec()
    if (users.length) {
        const deleteDictationsAndUsers = await Promise.all(users.map(async (user) => {
         const deleteDictsForUser= await DictationForUser.deleteMany({ user:user._id })
         if (!deleteDictsForUser) {
            return res.status(400).json({
                error: true,
                massage: 'Something worng',
                data: null
            })
        }
            const deleteUser = await user.deleteOne()
            if (!deleteUser) {
                return res.status(400).json({
                    error: true,
                    massage: 'Something worng',
                    data: null
                })
            }
            return deleteUser
        }))
        if (!deleteDictationsAndUsers) {

            return res.status(400).json({
                error: true,
                massage: 'Something worng',
                data: null
            })

        }
    }
    const deleteSentDictations= await Dictation.deleteMany({ class:_id })
    if (!deleteSentDictations) {
       return res.status(400).json({
           error: true,
           massage: 'Something worng',
           data: null
       })
   }
    const result = await foundClass.deleteOne()
    res.json({
        error: false,
        massage: '',
        data: result
    })
}
module.exports = { getClasses, getActiveClasses, getClassesByYear, createNewClass, updateClass, deleteClass }
