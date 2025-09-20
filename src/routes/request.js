const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { UserM} = require("../model/user");
const { ConnectionRequest } = require("../model/connection_request");    
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status 

            const allowedStatus = ["ignore","interested"]
            if (!allowedStatus.includes(status) ){
                return res.status(400).json({error : "Invalid status"})

            }
            const touser=await UserM.findById(toUserId)

            if (!touser){
                return res.status(404).json({message: "User not found"})
            }

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or:[
                    {fromUserId, toUserId},
                    {fromUserId: toUserId, toUserId: fromUserId}
                ]
            })
                if (existingConnectionRequest){
                    res.status(400).json({message : "Connection request already exists"})
                }

            // const existingConnectionRequest = await ConnectionRequest.findOne({

            // })
            const connectionRequest= new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            })

            const data =await connectionRequest.save()
                    

            res.json({
                message : `Connection request ${status}ed successfully`,
                data
            })





        }   
    catch(err){
        res.status(400).json({error : err.message})
    }     


});

module.exports = {requestRouter};