require("dotenv").config();
const express = require("express");
const { adminAuthFunction, userAuthFunction } = require("./middlewares/auth");
const { connectdb } = require("./config/database");   // ✅ lowercase matches
const { UserM } = require("./model/user");
const {validatesignupdata} = require("./utils/validation")
const app= express();
app.use(express.json());
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const jwt = require('jsonwebtoken');


const { authrouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");  

app.use("/", authrouter);
app.use("/", profileRouter);
app.use("/", requestRouter);





// app.post("/login", async (req, res) => {
//   const { emailID, password } = req.body;
//   console.log("Incoming login body:", req.body);



//   if (!emailID || !password) {
//     return res.status(400).json({ error: "Email and Password are required" });
//   }

//   const user = await UserM.findOne({ emailID });
//   console.log("User fetched from DB:", user);



//   if (!user) {
//     return res.status(400).json({ error: "User not found" });
//   }



//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   // console.log("Compare:", password, "vs", user.password, "=>", isPasswordValid);

//   if (!isPasswordValid) {
//     return res.status(400).json({ error: "Invalid password" });
//   }

//   // creating a JWT TOKEN here
//   const token = await jwt.sign({_id: user._id },"marnekebaadbhi")
//   res.cookie("token", token, {     
//     expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
//   });
//   res.status(200).json({
//     user,
//     message: "Login successful"
//   });
// });
// // app.post("/login",async (req,res) => {
// //   const {emailID, password}= req.body

// //   if (!emailID || !password){

// //     return res.status(400).json({error : "Email and Password are required"})
// //   }

// //   const user = await UserM.findOne({emailID})

// //   if (!user){
// //     return res.status(400).json({error : "User not found"})
// //   }

// //   const isPasswordValid = await bcrypt.compare(password,user.password)
  
  
// //     if (!isPasswordValid){
  
// //       return res.status(400).json({error : "Invalid password"})
  
// //     }
  
// //   res.status(200).json({
// //     user,
// //     message: "Login successful"
// // })




// // })
// app.post("/signup", async (req, res) => {
//   try {
//     validatesignupdata(req);



//     const { firstName, LastName, emailID, password } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     const user = new UserM({
//       firstName,
//       LastName,
//       emailID,
//       password: passwordHash,
//     });
//     await user.save();

//     res.status(201).json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });



// app.get("/profile", async (req, res) => {
//   try{
//   const cookie = req.cookies
//   const {token} = cookie
// if (!token){
//   return res.status(401).json({error : "No token present"})
// }
//   const istokenvalid = await jwt.verify(token,"marnekebaadbhi")
//   console.log(istokenvalid)
//   const {_id} = istokenvalid
//   console.log(_id)
//   console.log(cookie)
//   const user = await UserM.findById(_id)

//   res.json(user);
//   }
//   catch(err){
//     res.status(401).json({error : err.message})
//   }
// })


// app.post("/",async(req,res) =>{
//     try{
//     let d = req.body;
//     validatesignupdata(req);

//     const user = new UserM(d);

//     await user.save();
//     res.json(d);
// }
// catch(err){
//   res.status(400).send()
// }})

    
connectdb().then(() => {
  console.log('Database connected successfully');
  

  app.listen(8080, () => {
    console.log("SERVER IS LISTENING TO PORT: 8080");
  });

  
}).catch((err) => {

  console.error('Database connection error:', err);
});
