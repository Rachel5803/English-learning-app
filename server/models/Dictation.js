const mongoose = require('mongoose')
const dictationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dictationWords: [
        {
            word: {
                type: String,
                lowercase: true,
                trim: true
            },
            meanings: {
                type: [String],
                lowercase: true,
                trim: true
            },
        },
    ],
    class:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    sentToStudents:{
        type:Boolean,
        required: true,
        default:false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Dictation', dictationSchema)