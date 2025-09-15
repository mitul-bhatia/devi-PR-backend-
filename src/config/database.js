require('dotenv').config();
const mongoose = require('mongoose');

const connectdb = async () => {
    // if (!process.env.URL) throw new Error("❌ Mongo URL is missing!");
    await mongoose.connect("mongodb+srv://mitu_db_user:JGo87foy0T9MAgav@cluster0.vthoeo7.mongodb.net/devi");

}


module.exports = {connectdb};