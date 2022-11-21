const express = require("express")
const passport = require("passport")

const setupDatabase = require('../db') // Database and corresponding plugins must be loaded before any models are loaded
setupDatabase()

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../docs/swagger')
const session = require('express-session')
const keys = require("../env/config/keys")
const morgan = require('morgan')
const cors = require('../env/settings/cors')
const errorHandler = require("./helpers/errorHandler")
const attachAdminJS = require('./admin/setup')
const router = require("./routes")


const PORT = process.env.PORT || 8888; // Get dynamic port allocation when deployed by Heroku

const app = express();

// Adds the admin panel onto /admin //
attachAdminJS(app, '/admin')

app.use(session({
  secret: keys.cookieKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 6000000000
  }
}))
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(errorHandler)
app.use(cors)
app.use('', router)
app.use(errorHandler)

if (process.env.NODE_ENV !== "production") {
  // Ensure that the docs is only shown in development mode
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

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

module.exports = app