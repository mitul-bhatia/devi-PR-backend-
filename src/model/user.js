const mongoose =require("mongoose");
const jwt = require('jsonwebtoken');
const validator = require('validator')
const bycrypt = require('bcrypt');
const {Schema} = mongoose;




const userSchema = new Schema({
    firstName : 
    {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 10,
        
    },

    LastName  :  {
        type :String,
        required :false 
    },
    emailID : {
        type :String,
        lowercase :true,
        required :true,
        unique :true,
        trim :true,

    },
    password : String,
    age  : Number,
    skills : [String],
    about : String,
    idea : String,
    ideaDomain : String,
    
    gender : {
       type : String,
       validate: {
        validator: function (v) {
          return v === "male" || v === "female"; // only allow these
        },
        message: props => `${props.value} is not a valid gender!`
      } 
    },
    photoURL :{
        type : String
        
    }


},
{
    timestamps : true
});
userSchema.methods.getJWT= async function(){
  const user = this ;
  const token = jwt.sign({_id : user._id },"marnekebaadbhi", {expiresIn : "1d"});

    return token;
    
}

userSchema.methods.validatePassword = async function(passwordbyuser){
    const user = this ;

    const passwordHash= user.password

    const isvalidatepassword = await bycrypt.compare(

        passwordbyuser,
        passwordHash
    )

    return isvalidatepassword
}

let UserM= mongoose.model("user", userSchema);




module.exports = { UserM };   