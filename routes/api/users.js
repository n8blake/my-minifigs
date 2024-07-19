const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("passport");
const withToken = passport.authenticate("bearer");

router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

router.get("/currentIdentity", function (req, res) {
  //console.log(req);
  if (req.session.user || req.user) {
    req.params.id = req.session.user._id || req.user._id;
    return usersController.findById(req, res);
  } else {
    console.log('unauthorized')
    res.status(401).send();
  }
});

router.post("/new", function(req, res){
  if(req.body.password && req.body.email && req.body.firstName && req.body.lastName){
    usersController.create(req, res);
  } else {
    res.status(400).json("Malformatted user request");
  }
});
router.route("/resetpassword").post(usersController.requestPasswordResetLink);

// Matches with /api/users/:id
router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);


router.route("/:id/password").put(usersController.updatePassword);

module.exports = router;
