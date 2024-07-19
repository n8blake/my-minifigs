const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    color: { type: String, default: 'red'},
    password: { type: String },
    displayName: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    role: { type: String, required: true, default: 'user'},
    created: { type: Date, required: true, default: new Date() },
});

UserSchema.pre("save", function(next){
    if(!this.isModified("password")) return next();
    bcrypt.hash(this.password, 16.5, (err, hash) => {
        if(err) {
            next(err);
            return;
        }
        this.password = hash;
        next();
    })
});

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = Model("User", UserSchema);

module.exports = User;