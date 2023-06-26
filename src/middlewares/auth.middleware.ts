import passport from "passport";
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import { User } from '../schemas/user.schemas/user.model';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { PORT } from "../../index";

passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) return done(null, false, { message: 'Incorrect username and password' });
            if (user.password !== password) return done(null, false, { message: 'Incorrect username and password' });
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user: any, done) => {
    process.nextTick(() => {
        done(null, user._id);
    });
});

passport.deserializeUser((id: any, done) => {
    process.nextTick(() => {
        User.findById(id)
            .then((user: any) => { done(null, user) })
            .catch((err) => { done(err); })
    });
});

passport.use(new GoogleStrategy({
    clientID: "683585484602-2mhlp32eihlmj618k795gkctm7cp06v9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    passReqToCallback: true
},
    async (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
            const existingUser = await User.findOne({ 'google.id': profile.id });
            if (existingUser) return done(null, existingUser);
            const newUser = await new User({
                google: { id: profile.id },
                username: profile.emails[0].value,
                password: null,
                role: "normalUser"
            }).save();

            return done(null, newUser);
        } catch (err) {
            return done(null, false);
        }
    }
))

export default passport;