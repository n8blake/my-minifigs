require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/User");

// Define User REST Controls
module.exports = {
  findAll: function (req, res) {
    User.find(req.query, " -__v -user_token")
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((error) => res.status(422).json(error));
  },
  findById: function (request, response) {
    User.findOne({ _id: request.params.id }, "-__v")
      .then(async (user) => {
        if (user) {

          // Get the user's rebrickable profile...
          const url = `https://rebrickable.com/api/v3/users/${user.user_token}/profile`;
          const key = process.env.REBRICKABLE_API_KEY
          const config = {
            headers: { Authorization : `key ${key}`}
          }
          const { data: userProfileData } = await axios.get(url, config);
          const sanitizedUser = {
            _id: user._id,
            user_name: user.user_name,
          }
          if(userProfileData){
            sanitizedUser.profile = userProfileData;
          } 
            response.json(sanitizedUser);
          
        } else {
          response.status(404).json("User not found");
        }
      })
      .catch((error) => {
        console.log(error);
        response.status(400).send("Bad request");
      });
  },
  remove: function (req, res) {
    User.findById({ _id: req.params._id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
