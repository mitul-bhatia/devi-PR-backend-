const validator = require('validator')

const validatesignupdata = (req) => {
  const { firstName , LastName , emailID , password } = req.body;

  if (!firstName || !LastName){
    
    throw new Error("Name is not valid ");
  }
  else if (!validator.isEmail(emailID)){

    throw new Error("Email not valid ");
  }
  else if (!validator.isStrongPassword(password)) {

    throw new Error("Please enter a strong password ");
  }
}

const validateEditProfileData = (req) => {
    const allowedFields=[
      "firstName",
      "LastName",
      "emailID",
      "age",
      "photoURL",
      "gender"
    ]
      const isEditAllowed = Object.keys(req.body).every((field) => allowedFields.includes(field)) 
    return isEditAllowed
}   

module.exports = { validatesignupdata ,
  validateEditProfileData
}
