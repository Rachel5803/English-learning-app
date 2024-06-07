const User = require("../models/User")
const DictationForUser = require("../models/DictationForUser")
const bcrypt = require('bcrypt')
const getUsersForSpecificClass = async (req, res) => {
    const {classId}=req.body
    const users = await User.find({ class:classId}, {_id:0 , name:1, dictations:1}).lean()
    if (!users.length) {
        return res.status(400).json({ massage: 'No users found' })
    }
    res.json(users)
}
const getUsers = async (req, res) => {
    const users = await User.find({roles:'Student'},{password:0}).sort({active:-1}).populate("class").lean()
    if (!users.length) {
        return res.status(400).json({
            error: true,
            massage: 'לא נמצאו משתמשים',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: users
    })
}
const getUserById = async (req, res) => {
    const { _id } = req.body
    const user = await User.findById(_id, { password: 0 }).lean()
    if (!user) {
        return res.status(400).json({
            error: true,
            massage: 'No user found',
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: user
    })
}
const createNewUser = async (req, res) => {
    const image = (req.file?.filename? req.file.filename: "")
    const { username, password, name, classId, active} = req.body
    if (!name || !username || !password||!classId) {
        return res.status(400).json({
            error: true,
            massage: 'You need to press name, user name, class and password',
            data: null
        })
    }
    const checkDouble = await User.findOne({ username}).lean()
    if (checkDouble) {
        return res.status(400).json({ massage: 'The username exists in the system, press a unique username' })
    }
    const hashPwd = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashPwd, name, class:classId,  roles:'Student', active, image })
    if (user) {
        return res.json({
            error: false,
            message: '',
            data: {user:user.username, id:user._id}
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
const updateUser = async (req, res) => {
    const image = (req.file?.filename? req.file.filename: "")
    const { _id, username, password, name, classId, active} = req.body
    if (!_id || !username  || !name) {
        return res.status(400).json({
            error: true,
            massage: 'Id, user name, password, name, class and roles are required',
            data: null
        })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({
            error: true,
            massage: 'No user found',
            data: null
        })
    }
    if (!classId&&user.roles==='Student') {
        return res.status(400).json({
            error: true,
            massage: 'Class is required',
            data: null
        })
    }
    if(password){
        const hashPwd = await bcrypt.hash(password, 10)
        user.password=hashPwd
    }
    if(user.roles==='Student'){
        user.class = classId;
        user.roles = 'Student'
    }
    user.username = username;
    user.name = name;
    user.active = active;
    if(image){
        user.image = image
    }
    const updateUser= await user.save();
    res.json({
        error: false,
        massage: `'${updateUser.name}' updated`,
        data: {user:user.username, id:user._id}
    })
}
// const updateDictationComplete = async (req, res) => {
//     const { userId, dictationId, score} = req.body
//     const user = await User.findOne({ _id: userId}).exec()
//     if (!user) {
//         return res.status(400).json({ massage: 'User not found' })
//     }
//     const dictation = user.dictations.find(dictation => dictation.dictationId.equals(dictationId));
//     if (!dictation) {
//         return res.status(400).json({ massage: 'Dictation not found for the user' })
//     }
//     dictation.completed = true;
//     dictation.score = score;
//     const updateUser= await user.save();
//     res.json(`'${updateUser.name}' updated`)
// }
const updateUserForUser = async (req, res) => {
    const image = (req.file?.filename? req.file.filename: "")
    const { _id, password, name} = req.body
    if (!_id  || !name) {
        return res.status(400).json({
            error: true,
            massage: 'Id, password, name are required',
            data: null
        })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({
            error: true,
            massage: 'No user found',
            data: null
        })
    }
    if(password){
        const hashPwd = await bcrypt.hash(password, 10)
        user.password=hashPwd
    }
    user.name = name;
    if(image){
        user.image = image
    }
    const updateUser= await user.save();
    res.json({
        error: false,
        massage: `'${updateUser.name}' updated`,
        data: {user:user.username, id:user._id}
    })
}
const deleteUser = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            massage: 'Id is required',
            data: null
        })
    }
    const foundUser = await User.findById(_id).exec()
    if (!foundUser) {
        return res.status(400).json({
            error: true,
            massage: 'No user found',
            data: null
        })
    }
    const dictationsFU = await DictationForUser.find({ user:_id }).exec()
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
    const result = await foundUser.deleteOne()
    res.json({
        error: false,
        massage: '',
        data: result
    })
}


module.exports = { getUsers, createNewUser,getUserById,updateUserForUser, updateUser,getUsersForSpecificClass, deleteUser}
