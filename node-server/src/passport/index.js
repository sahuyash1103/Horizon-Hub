const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require("./../mongo/schema/userSchema");
const { generateAvatarFromName } = require("./../utils/generate-avatar");
const { storeProfilePic } = require("./../firebase/storage/storage");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CALLBACK_URL, GITHUB_CALLBACK_URL } = require("./../utils/get-env");
const _ = require("lodash");

// -------------------------PASSPORT CONFIGURATION FOR GOOGLE AUTH
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        let userName = profile.email?.split("@")[0] || profile.username;
        let user = await User.findOne({
            $or: [
                { email: profile.email },
                { userName: userName }]
        })
            .select("_id name email profilePic provider");
        if (!user) {
            user = User({
                name: profile.displayName,
                email: profile.email,
                userName: profile.email?.split("@")[0],
                provider: "google",
            })

            const profilePic = generateAvatarFromName(user.name);
            const profilePicUrl = await storeProfilePic(profilePic, user._id);

            user.profilePic = profilePicUrl;

            await user.save();
        }
        if (user.provider !== "google") return done(`Account is registered with ${user.provider} provider.`, false);
        return done(null, _.pick(user, ["_id", "name", "email"]));
    }
));

// -------------------------PASSPORT CONFIGURATION FOR GITHUB AUTH
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL || "/api/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        let userName = profile.email?.split("@")[0] || profile.username;
        let user = await User.findOne(
            {
                $or: [
                    { email: profile.email || userName },
                    { userName: userName }
                ]
            })
            .select("_id name email profilePic provider");
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.email || profile.username,
                userName: userName,
                provider: "github",
            })

            const profilePic = generateAvatarFromName(user.name);
            const profilePicUrl = await storeProfilePic(profilePic, user._id);

            user.profilePic = profilePicUrl;

            await user.save();
        }
        if (user.provider !== "github") return done(`Account is registered with ${user.provider} provider.`, false);
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
            if (!user) return done('Incorrect email.', false);
            if (user.isDeleted) return done('Profile is deleted.', false);

            if (user.isSuspended) return done('Profile is suspended.', false);

            if (user.isLocked) return done('Profile is locked.', false);

            const validPassword = await user.verifyPassword(password);
            if (!validPassword) return done('Incorrect password.', false);

            const token = `Bearer ${user.generateAuthToken()}`;

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

