const Dictation = require("../../models/firstModels/Dictation")
const User = require("../../models/firstModels/User")
// const getAllDictations = async (req, res) => {
//     const dictations = await Dictation.find({}).lean()
//     if (!dictations.length) {
//         return res.status(400).json({ massage: 'No dictations found' })
//     }
//     res.json(dictations)
// }
const getDictationsForSpecificGrade = async (req, res) => {
    const dictations = await Dictation.find({ school: req.body.school, grade: req.body.grade, gradeNumber: req.body.gradeNumber }).lean()
    if (!dictations.length) {
        return res.status(400).json({ massage: 'No dictations found' })
    }
    res.json(dictations)
}
const createNewDictation = async (req, res) => {
    const { name, school, grade, gradeNumber} = req.body
    if (!name || !school || !grade || !gradeNumber) {
        return res.status(400).json({ message: 'you need to press name, school, grade and gradeNumber' })
    }
    const dateOfSubmission = new Date();
    dateOfSubmission.setDate(dateOfSubmission.getDate() + 7);
    const dictation = await Dictation.create({ name, school, grade, gradeNumber, dateOfSubmission })
    if (dictation) {
        const users = await User.find({ school: req.body.school, grade: req.body.grade, gradeNumber: req.body.gradeNumber }).exec()
        users.map(async (user) => {
            user.dictations.push({dictationId:dictation});
            await user.save();
          });
          await dictation.save();
        return res.status(201).json(dictation._id)
    }
    else {
        return res.status(400).json({ massage: 'Invalid dictation' })
    }
}
const updateWordDictation = async (req, res) => {
    const { id, words} = req.body
    const dictation = await Dictation.findOne({ _id: id}).exec()
    if (!dictation) {
        return res.status(400).json({ massage: 'Dictation not found' })
    }
    dictation.words = [...words];
    const updateDictation= await dictation.save();
    res.json(`'${dictation.name}' updated`)
}
module.exports = {getDictationsForSpecificGrade,createNewDictation,updateWordDictation}
