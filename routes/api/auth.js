const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/login/password",
  passport.authenticate("rebrickable"),
  function (req, res) {
    console.log("post login route hit")
    if (process.env.NODE_ENV === "development") {
      console.log("getting user");
    }
    if (req.session.passport && req.session.passport.user.user_token) {
      res.status(200).json(req.session.passport.user);
    } else {
      console.log(req.session);
      res.status(401).send();
    }
  }
);

router.get("/status", function(req, res){
  console.log("get login status route hit")
  //console.log(req.session.passport)
  if (req.session.passport && req.session.passport.user) {
    res.status(200).json(req.session.passport.user);
  } else {
    res.status(401).send();
  }
});

router.get("/logout", function (req, res, next) {
  //req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.status(200).json({ status: "Logged Out." });
    });
  });
});

module.exports = router;
