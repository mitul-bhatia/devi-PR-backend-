const jwt = require("jsonwebtoken")
const {UserM}= require("../model/user")


  
const userAuthFunction = async (req, res, next) => {
  try{
  const {token} = req.cookies
    if (!token){
      return res.status(401).json({error : "No token present"})
    }    

    const decodedobject = jwt.verify(token,"marnekebaadbhi",expiresIn="1d")


    

    const {_id} = decodedobject
    const user = await UserM.findById(_id)


    if (!user){
      throw new Error("User not found")
    }
    next()

  }
  catch(err){
    res.status(401).json({error :err.message})

  }
}
module.exports={

    userAuthFunction
}