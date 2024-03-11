const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI);
    }
    catch(ex){
        console.error(ex)
    }
}

module.exports = connectDB