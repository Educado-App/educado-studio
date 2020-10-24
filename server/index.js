// Constant requires
const express = require('express'); // Import express
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

// Mongoose Model executions
require('./models/User');

// Execution requires
require('./services/passport'); // Execute passport config


// Application 
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express(); // Configuration for listening, communicate to handlers

// ** MIDDLEWARE ** //
// app.use wires up "middlewares", that modify incoming requests before being passed on to handlers. 
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000, // Cookie should last for 30 days before automatic expiration
        keys: [keys.cookieKey], // Specify encryption key for cookie
    })
);
app.use(passport.initialize());
app.use(passport.session());
// ** END SECTION ** //


// Setup authentication routes
require('./routes/authRoutes')(app);

// Run server
const PORT = process.env.PORT || 5000 // Get dynamic port allocation when deployed by Heroku. Otherwise, by default, use port 5000 
app.listen(PORT);



