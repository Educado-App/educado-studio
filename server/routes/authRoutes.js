const passport = require('passport') // Import passport library module

module.exports = (app) => {
    // Route handler for login simulation
    app.get('/auth/google', passport.authenticate('google',{ // 'google' identifies a GoogleStrategy
        scope: ['profile','email'] // Specifies to google what access we request access to. Full list of possibilities can be seen on google.
    }))

    // Route handler for auth callback (Automatically gets 'code' from earlier call)
    app.get('/auth/google/callback', passport.authenticate('google'));
    
    // Logout simulation
    app.get('/api/logout',(req,res) => {
        req.logout();
        res.send(req.user);
    });

    // Show current user simulation
    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    });




}

