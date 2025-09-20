const express = require("express");

const authrouter = express.Router();

const { validatesignupdata } = require("../utils/validation");
const { UserM } = require("../model/user");

const bcrypt = require("bcrypt");

authrouter.post("/signup", async (req, res) => {
  try {
    validatesignupdata(req);
    const { firstName, LastName, emailID, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new UserM({
      firstName,
      LastName,
      emailID,
      password: passwordHash,
    });
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
authrouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await UserM.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
    });
    res.status(200).json({
      message: "Login successful",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

authrouter.post("/logout",async (req, res) => {
  try {
    res.Cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.status(200).json({ message: "Logout successful" });
  
}
catch(err){
    res.status(400).json({ error: err.message });
}}
)

module.exports = { authrouter };
