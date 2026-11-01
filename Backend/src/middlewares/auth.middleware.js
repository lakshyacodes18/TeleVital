const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')


async function protect(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }
        req.user = user
        next()
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid or Expired token"
        })
    }
}



module.exports = protect