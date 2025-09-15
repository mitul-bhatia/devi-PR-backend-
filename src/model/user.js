const mongoose =require("mongoose");

const {Schema } = mongoose;




const userSchema = new Schema({
    firstName : String,
    LastName  : String,
    emailID : String,
    password : Number,
    age  : Number,
    gender : String
});

let UserM= mongoose.model("user", userSchema);


module.exports = { UserM };   