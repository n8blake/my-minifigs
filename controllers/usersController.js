const mongoose = require("mongoose");
const User = require("../models/User");
const crypto = require("crypto");
const emailController = require("./emailController");
const makeToken = require("../utils/AppleTokenGenerator");
const jwt = require("jsonwebtoken");
const generateEmail = require("../utils/EmailGenerator");
// Define User REST Controls
module.exports = {
  findAll: function (req, res) {
    User.find(req.query, "-hashedPassword -salt -__v")
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((error) => res.status(422).json(error));
  },
  findById: function (request, response) {
    User.findOne({ _id: request.params.id }, "-hashedPassword -salt -__v")
      .then((user) => {
        if (user) {
          response.json(user);
        } else {
          response.status(404).json("User not found");
        }
      })
      .catch((error) => {
        console.log(error);
        response.status(400).send("Bad request");
      });
  },
  create: function (req, res, next) {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.pbkdf2(
      req.body.password,
      salt,
      50000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return next(err);
        }
        let user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          salt: salt,
          hashedPassword: hashedPassword.toString("hex"),
          email: req.body.email,
        };
        User.create(user)
          .then((newUserData) => {
            //console.log(data);
            const returnedData = {
              firstName: newUserData.firstName,
              lastName: newUserData.lastName,
              email: newUserData.email,
              userCreated: newUserData.userCreated
            };
            res.json(returnedData);
          })
          .catch((error) => {
            if (error.code == 11000) {
              console.log("user already exists");
              res.status(422).json("user already exists");
            } else {
              console.log(error);
              res.status(422).json(error);
            }
          });
      }
    );
  },
  update: function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  updatePassword: function (req, res, next) {
    console.log("updating password");
    if(!req.body.token) {
      res.status(401).json("Invalid password reset attempt.");
      return;
    };
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    if (
      !decoded.expirationDate ||
      !decoded.id ||
      !decoded.password
    ) {
      res.status(401).send("Invalid password reset attempt.");
    }
    console.log(decoded);
    const { expirationDate } = decoded;
    const expirationDateObject = new Date(expirationDate);
    if (expirationDateObject < new Date()) {
      res.status(403).send("Token has expired. Request new password reset link.");
      return;
    }
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.pbkdf2(
      decoded.password,
      salt,
      50000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return next(err);
        }
        let user = {
          salt: salt,
          hashedPassword: hashedPassword.toString("hex"),
        };
        User.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(decoded.id) },
          user
        )
          .then(() => res.json("password updated"))
          .catch((err) => res.status(422).json(err));
      }
    );
  },
  requestPasswordResetLink: function(req, res){
    User.findOne({ email: req.body.email }).then(user => {
      if(user.email){
        const token = makeToken({email: user.email, id:user._id}, 24);
        const link = `${process.env.HTTP}://${process.env.APP_BASE_URL}/passwordreset/${token}`;
        const email = generateEmail(link);
        emailController.sendEmail(user.email, "Password Reset Requested", email, true).then(result => {
          console.log(result);
          if(result){
            res.status(200).json("Email sent. Please check your inbox.");
          }
        })
          .catch(error => {
            console.log(error);
            res.status(400).json(error);
          });
      } else {
        res.status(404).json("User not found");
      }
    });
  },
  remove: function (req, res) {
    User.findById({ _id: req.params._id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
