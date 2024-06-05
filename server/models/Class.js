const mongoose = require('mongoose')
const classSchema = new mongoose.Schema({
    school: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    gradeNumber: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    schoolYear:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Class', classSchema)