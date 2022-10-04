const router = require("express").Router();

// Routes
const CourseRoutes = require("./courseRoutes");
const AWSRoutes = require("./bucketRoutes");
const AuthRoutes = require("./authRoutes");
const SignupRoutes = require("./signupRoutes");

// Print all routes defined in app
router.get("/api", (req, res) => {
  res.send(router.stack);
});

router.use("/api", CourseRoutes);
router.use("", AWSRoutes);
router.use("", AuthRoutes);
router.use("/api", SignupRoutes);

module.exports = router;
