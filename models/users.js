const mongoose = require("mongoose");

const users = new mongoose.Schema({
    email: { type: String, required: false },
    password: { type: String, required: false },
    // secretNumber: { type: Number, required: false },
    timestamp: { type: Number, default: Date.now, required: true }
});


module.exports = mongoose.model("users", users);