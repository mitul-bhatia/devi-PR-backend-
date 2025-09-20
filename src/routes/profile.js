const express = require("express");

const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


profileRouter.patch("/profile/edit",userAuth, async (req,res) => {
    try{
        if (!validateEditProfileData(req)){
            throw new Error("Invalid data")
        }
        const loggedInUser = req.user // the user comming from my miiddle ware 


        
        
        Object.keys(req.body).
        forEach((key)=>(loggedInUser[key]= req.body[key]))

        await loggedInUser.save()
        res.json({
            message : `${loggedInUser.firstName} profile updated successfully`,
            data : loggedInUser
        })
    }
    catch(err){
        res.status(400).send({error : err.message})
    }


})

profileRouter.patch("/profile/password",userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user
        const {oldPassword, newPassword} = req.body

        if (!oldPassword || !newPassword){
            throw new Error("Both old and new password are required")
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, loggedInUser.password);
        if (!isPasswordValid) {
          throw new Error("Old password is incorrect");
        }

        if (newPassword.length < 6){
            throw new Error("New password must be at least 6 characters long")
        }

        const hashedPassword =await bcrypt.hash(newPassword, 10 )
    

        loggedInUser.password = hashedPassword
        await loggedInUser.save()

        res.json({
            message : "Password updated successfully"
        })
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
})
module.exports = { profileRouter };