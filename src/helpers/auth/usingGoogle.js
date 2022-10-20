const GoogleStrategy = require('passport').Strategy
const config = require("../../../env/config/keys");

const { userList } = require('../../users')

// Google OAuth Strategy 1: Login
const googleStrategy =
    new GoogleStrategy(
        {
            clientID: config.googleClientID,
            clientSecret: config.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await userList.findByGoogleId(profile.id);
            if (existingUser) {
                done(null, existingUser);
            }
            else {
                // We dont have a user record with this ID, make a new record
                const user = await new UserModel({ googleID: profile.id }).save();
                done(null, user);
            }
        }
    )

// Google OAuth Strategy 1: Login
const googleRestrictedStrategy =
    new GoogleStrategy(
        {
            clientID: config.googleClientID,
            clientSecret: config.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            // Find user with email of the one clicking
            let existingUser;
            let index;

            for (i = 0; i < profile.emails.length; i++) {
                const tempUser = await UserModel.findOne({ email: profile.emails[i].value });

                if (tempUser) {
                    existingUser = tempUser;
                    index = i;
                }
            }

            // If such a user exist
            if (existingUser) {
                // If that user ALREADY has a Google ID, finish with that user
                if (existingUser.googleID) {
                    done(null, existingUser);
                } else {
                    // Else remove user, add new with ID and email
                    await UserModel.remove({ email: profile.emails[index].value });
                    const user = await new UserModel({
                        googleID: profile.id,
                        email: profile.emails[index].value,
                    }).save();
                    done(null, user); // Finish with NEW user
                }
            } else {
                // Only here, if user is NOT registered in Database
                done(null, false); // Return with "unauthorized error"
            }
        }
    )


module.exports = {
    googleStrategy,
    googleRestrictedStrategy
}