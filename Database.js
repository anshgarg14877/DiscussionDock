const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(console.log("DB Connected Successfully"))
    .catch((err) => console.log("Error in DB Connection: " + err.message));
}

module.exports = dbConnect;