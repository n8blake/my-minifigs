const router = require("express").Router();
const passport = require("passport");

const authRoutes = require("./auth");
const usersRoutes = require("./users");
const legoRoutes = require("./lego");

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/lego", legoRoutes);

// export
module.exports = router;
