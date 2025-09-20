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

module.exports = { validatesignupdata }
