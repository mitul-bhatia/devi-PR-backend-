require("dotenv").config();
const express = require("express");
const { adminAuthFunction, userAuthFunction } = require("./middlewares/auth");
const { connectdb } = require("./config/database");   // ✅ lowercase matches
const { UserM } = require("./model/user");

const app= express();
app.use(express.json());

app.post("/signup",async (req,res) =>{

  const obj ={
    firstName : "MItul Bhatia",
    LastName  : "Bhatia",
    emailId : "mitul@gmail.com",
     password : 123456,

  }
  // new instance of the 
  const user = new UserM(obj);
  await user.save();
  res.send("tmc")
})


// app.use("/api/admin", adminAuthFunction);

// app.get("/api/admin/get-user", (req, res) => {
//   res.send("/api/admin/get-user");
// });

// app.get("/api/admin/delete-user", (req, res) => {
//   res.send("/api/admin/delete-user");
// });

// app.get("/api/user/create", (req, res) => {
//   res.send("user created successfully");
// });

// app.get("/api/user/login", userAuthFunction, (req, res) => {
//   res.send("user login successful");
// });

// app.use((err, req, res, next) => {
  
//   console.log(err.message);
  
//   res.status(500).send(err.message);
// });  

connectdb().then(() => {
  console.log('Database connected successfully');
  

  app.listen(8080, () => {
    console.log("SERVER IS LISTENING TO PORT: 8080");
  });

  
}).catch((err) => {

  console.error('Database connection error:', err);
});

