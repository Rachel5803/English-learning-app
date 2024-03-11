const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    roles: {
        type: String,
        enum: ['Teacher', 'Student'],
        default: 'Student'
    },
    active:{
        type: Boolean,
        default:true
    },
    image:{
        type:String
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)