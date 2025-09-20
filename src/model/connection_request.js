const mongoose = require('mongoose');

const connnectionRequestSchema = new mongoose.Schema({

    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status :{
        type : String ,
        enum : ["ignore","interested","accepted","rejected"],
        message :`{VALUE} is not supported`,
        required : true
    }



},{
    timestamps : true
})


connnectionRequestSchema.pre("save",function(){
    const connectionRequest = this;
    // if fromUserID is same as toUdseId 

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send connection request to yourself ")
    }
    next()
})

connectionRequestSchema.index({fromUserId:1,toUserId:1});


const ConnectionRequest = mongoose.model("connectionrequest",connnectionRequestSchema)
module.exports = {
    ConnectionRequest
}
