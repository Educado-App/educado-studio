const passport = require('passport') // Import passport library module

const mongoose = require('mongoose');

module.exports = (app) => {
    // Route handler for login simulation
    app.get('/auth/google', passport.authenticate('google-restricted',{ // 'google' identifies a GoogleStrategy
        scope: ['profile','email'] // Specifies to google what access we request access to. Full list of possibilities can be seen on google.
    }))

    // Route handler for auth callback (Automatically gets 'code' from earlier call)
    app.get(
        '/auth/google/callback',
        passport.authenticate('google-restricted'),
        (req,res) => {
            res.redirect('/');
        }    
    );
    
    // Logout simulation
    app.get('/api/logout',(req,res) => {
        req.logout();
        res.redirect('/');
    });

    // Show current user simulation
    app.get('/api/current_user', (req,res) => {
        setTimeout(() => {
            res.send(req.user);
        },1500)        
    });

}

