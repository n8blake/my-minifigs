const router = require("express").Router();
const usersController = require("../../controllers/usersController");
// const passport = require("passport");
// const withToken = passport.authenticate("bearer");

router.route("/")
  .get(usersController.findAll);

// Matches with /api/users/:id
router
  .route("/:id")
  .get(usersController.findById)


// router.route("/:id/password").put(usersController.updatePassword);

module.exports = router;
