// Constant requires
const express = require('express'); // Import express
const mongoose = require('mongoose'); // Import mongoose
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

// Mongoose Model executions
require('./models/User');
require('./models/Courses');
require('./models/Sections');

// Execution requires
require('./services/passport'); // Execute passport config


// Application 
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

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
app.use(express.json());
// ** END SECTION ** //


// Setup authentication routes
require('./routes/authRoutes')(app);
require('./routes/courseRoutes')(app);
require('./routes/bucketRoutes')(app);


// Run if running in production on Heroku
if (process.env.NODE_ENV === 'production') {
    // Make sure that express handles production correctly
    // Make sure that express serves prodcution assets
    app.use(express.static('client-web/build'))

    // Express will serve up the index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

}


// Run server
const PORT = process.env.PORT || 5000 // Get dynamic port allocation when deployed by Heroku. Otherwise, by default, use port 5000 
app.listen(PORT);



