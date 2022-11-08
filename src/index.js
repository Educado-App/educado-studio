const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");

const keys = require("../env/config/keys");
const router = require("./routes");
const cors = require('../env/settings/cors');
const context = require('./middlewares/context');
const { connectToDb } = require("../db");
const errorHandler = require("./helpers/errorHandler");

// Mongoose Model executions
require("./models/User");
require("./models/AppUser");
require("./models/Courses");
require("./models/Sections");
require("./models/Components");

const PORT = process.env.PORT || 8888; // Get dynamic port allocation when deployed by Heroku

// Setup connection to database
connectToDb(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express(); // Configuration for listening, communicate to handlers

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie should last for 30 days before automatic expiration
    keys: [keys.cookieKey], // Specify encryption key for cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(errorHandler)
app.use(cors)
app.use(context)
app.use('', router)

// Setup authentication routes
require("./routes/appAuthRoutes")(app);
//require("./routes/authRoutes")(app);
//require("./routes/courseRoutes")(app);
//require("./routes/bucketRoutes")(app);

// Run if running in production on Heroku
if (process.env.NODE_ENV === "production") {
  // Make sure that express handles production correctly
  // Make sure that express serves prodcution assets
  app.use(express.static("client-web/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Run server
app.listen(PORT, () => {
  console.log(`⚡ Running app at ${keys.WEB_HOST || 'http://localhost'}:${PORT}`);
})
