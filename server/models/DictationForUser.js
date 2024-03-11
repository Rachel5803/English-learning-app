const mongoose = require('mongoose')
const dictationForUserSchema = new mongoose.Schema({
    dictation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dictation",
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    dictationWordsAnswers: [
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
    beginDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    completed: {
        type:Boolean,
        default:false
    },
    score:{
        type:Number,
        default:0
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('DictationForUser', dictationForUserSchema)