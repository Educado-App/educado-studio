// Passport authentication imports
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

// Import consts
const keys = require('./../config/keys')
const User = mongoose.model('users') // Pulls out the users collection from mongoose. User object is our model class

// ** SERIALIZATION & DESERIALIZATION ** //
passport.serializeUser((user,done) => { // Serialize user with user.id. This is send TO the client FROM the server. 
    done(null,user.id);
});

passport.deserializeUser((id,done) => { // When client contacts server with cookie, desearilise extracts the ID, Find user in Database with that ID, and return user.
    User.findById(id)
        .then(user => {
            done(null,user);
        })
});


// OAuth
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true 
}, async (accessToken,refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleID: profile.id}) // Look through User collection for an instance already with the ID
    
    if (existingUser) { 
        // If existingUser exists, we already have a record with the given profile ID
        done(null,existingUser); // Inform passport that authentication is done. Return null for error, and the existing user
    } else {
        // We dont have a user record with this ID, make a new record 
        const user = await new User({
            googleID: profile.id, // Creates instance of User with the unique profile ID from Google OAuth
        }).save();
        done(null,user); // Wait for asyncronious DB call to finish, and return the created user
    }        
}));





