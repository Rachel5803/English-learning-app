const verifyAdmin = (req,res,next) =>{
    if(req.user && req.user.roles ==="Teacher"){
        next()
    }else{
        return res.status(401).json({
            error: true,
            message: "Unauthorized Admin",
            data: null
        })
    }

}
module.exports = verifyAdmin