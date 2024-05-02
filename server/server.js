require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbconn")
const PORT = process.env.PORT || 7001
const app = express()
connectDB()
//middlewares
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))
//routes
app.use("/api/auth", require("./routers/authRoutes"))
app.use("/api/classes", require("./routers/classRoutes"))
app.use("/api/users", require("./routers/userRoutes"))
app.use("/api/dictations", require("./routers/dictationRoutes"))
app.use("/api/dictationForStudent", require("./routers/dictationFURoutes"))
app.get("/", (req, res) => {
    res.send("this is the home page")
})

mongoose.connection.once('open', () => {
    console.log('connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
mongoose.connection.on('error', err => {
    console.log(err);
})
