const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const login = async (req,res) =>{
    const {username, password} = req.body

    if(!username || !password) {
        return res.status(401).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    //get the user from the DB
    const foundUser = await User.findOne({username: username, active:true}).populate("class", {name: 1}).lean()
    if(!foundUser) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    const match = await bcrypt.compare( password, foundUser.password)
    if(!match) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }

    // give the token to the user

    const userInfo  = {
        _id: foundUser._id,
        username: foundUser.username,
       name: foundUser.name,
        roles: foundUser.roles,
        class: foundUser.class,
        image:foundUser.image
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

    const refreshToken = jwt.sign({username: foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'} )

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000
    })

    res.json({accessToken})



}
const refresh = async (req,res) =>{
    const cookies = req.cookies
    if(!cookies?.jwt) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET, 
        async (err,decode) =>{
            if(err){
                return res.status(403).json({
                    error: true,
                    message: "Forbidden",
                    data: null
                })
            }
            const foundUser = await User.findOne({username: decode.username, active:true}).populate("class", {name: 1}).lean()
            const userInfo  = {
                _id: foundUser._id,
                username: foundUser.username,
                name: foundUser.name,
                roles: foundUser.roles,
                class: foundUser.class,
                image:foundUser.image
            }
        
            const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
        
            res.json({accessToken})
        })

}
const logout = async(req, res) =>{
    const cookies = req.cookies
    if(!cookies?.jwt){
        return res.status(204).json({
            error: true,
            message: "No Content",
            data: null
        })
    }
    res.clearCookie("jwt",  {
        httpOnly: true
    })
    res.json({
        error: false,
        message: "Cookie Cleard",
        data: null
    })
}
module.exports = {login, refresh, logout}