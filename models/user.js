const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = new Schema({
    user_name: { type: String, required: true },
    user_token: { type: String, required: true }
})

const User = Model("User", UserSchema);

module.exports = User;