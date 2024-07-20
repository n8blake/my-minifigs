const User = require('../models/User');
require("dotenv").config();
const LocalStrategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const axios = require("axios");


const configure = function(passport){
    console.log('configuring');
    passport.serializeUser(function(user, done){
        console.log(`Serialize User called ${user}`);
        done(null, user);
    });
    passport.deserializeUser(function(user, done){
        console.log(`Deserialize User called `);
        //console.log(user);
        
        return User.findOne({ user_token: user.user_token}, "-__v").then(foundUser => {
            //console.log(foundUser);
            if(!foundUser){
                console.log("User not in DB. Adding...")
                //console.log(user);
                return User.create(user).then(createdUser => {
                    console.log("Added User");
                    console.log(createdUser);
                    return done(null, createdUser);
                })
            } else {
                console.log("User in database. Continuing...")
                //console.log(foundUser);
                //console.log(passport);
                passport.user = foundUser;
                //console.log(passport);
                return done(null, foundUser);
            }
        })
    });

    // Custom Strategy
    passport.use('rebrickable', new CustomStrategy(
        async function(request, done){
            console.log("using rebrickable auth...");
            if(request.body.username && request.body.password){
                try {
                    console.log(`Hello ${request.body.username}`)
                    console.log('authenticating...');
                    let rebrickableUserURL = "https://rebrickable.com/api/v3/users/_token/"
                    const authData = {
                        username: request.body.username,
                        password: request.body.password
                    }
                    
                    const key = process.env.REBRICKABLE_API_KEY
                    const config = {
                        headers: { 
                            Authorization : `key ${key}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                    axios.post(rebrickableUserURL, authData, config).then(response => {
                        if(response.data){
                            console.log(response.data);
                            if(response.data.user_token){
                                console.log("setting user data in session.")
                                //console.log(request.session);
                                request.session.user_token = response.data.user_token;
                                request.session.user_name = request.body.username;
                                //console.log(request.session);
                                response.data.user_name = request.body.username;
                                return User.findOne({ user_token: response.data.user_token}, "-__v").then(foundUser => {
                                    //console.log(foundUser);
                                    if(!foundUser){
                                        console.log("User not in DB. Adding...")
                                        console.log(user);
                                        User.create(user).then(createdUser => {
                                            console.log("Added User");
                                            //console.log(createdUser);
                                            request.session._id = createdUser._id;
                                            return done(null, createdUser);
                                        })
                                    } else {
                                        console.log("User in database. Continuing...")
                                        //console.log(foundUser);
                                        request.session._id = foundUser._id;
                                        return done(null, foundUser);
                                    }
                                }).catch(error => {
                                    console.log(error);
                                    return done(null, false, {message: 'User lookup error'});
                                })

                            } 
                        } else {
                            console.log(response);
                            return done(null, false, {message: "no user data returned"})
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                        return done(null, false, {message: "error logging to Rebrickable"})
                    })
                } catch (error) {
                    console.log(error);
                    return done(null, false);
                }
            } else {
                console.log(request.body);
                return done(null, false);
            }
        }
    ))
}



module.exports = configure;

