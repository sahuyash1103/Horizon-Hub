const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require("../mongo/schema/userSchema");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require("../utils/get-env");
const _ = require("lodash");

// -------------------------PASSPORT CONFIGURATION FOR GOOGLE AUTH
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ email: profile.email }).select("_id name email profilePic");
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.email,
                userName: profile.email?.split("@")[0],
                profilePic: profile.picture,
                provider: "google",
            })
            await user.save();
        }
        return done(null, _.pick(user, ["_id", "name", "email"]));
    }
));

// -------------------------PASSPORT CONFIGURATION FOR GITHUB AUTH
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3001/api/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        let user = await User.findOne({ email: profile.email || profile.username }).select("_id name email profilePic");
        if (!user) {
            userName = profile.email?.spit("@")[0] || profile.username;
            user = new User({
                name: profile.displayName,
                email: profile.email || profile.username,
                userName: userName,
                provider: "github",
            })
            await user.save();
        }
        return done(null, _.pick(user, ["_id", "name", "email"]));
    }
));

// -------------------------PASSPORT CONFIGURATION FOR LOCAL AUTH
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
},
    async function (req, email, password, done) {
        try {
            const user = await User.findOne({ email: email });
            if (!user) return done(null, false, { message: 'Incorrect email.' });
            if (user.isDeleted) return done(null, false, { message: 'Profile is deleted.' });

            if (user.isSuspended) return done(null, false, { message: 'Profile is suspended.' });

            if (user.isLocked) return done(null, false, { message: 'Profile is locked.' });

            const validPassword = await user.verifyPassword(password);
            if (!validPassword) return done(null, false, { message: 'Incorrect password.' });

            const token = `Bearer ${user.genrateAuthToken()}`;

            return done(null, _.pick(user, ["_id", "name", "email", "phone"]), { token });
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});

