const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("../utils/get-env");

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/auth/google/callback",
    passReqToCallback: true
},
    (request, accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        return done(null, profile);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        // });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});
