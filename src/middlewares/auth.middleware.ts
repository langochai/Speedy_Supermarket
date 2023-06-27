import passport from "passport";
import { User } from '../schemas/user.schemas/user.model';
import { Cart } from "../schemas/user.schemas/cart.model";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import bcrypt from 'bcrypt';
import {PORT} from "../../config"

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) return done(null, false);

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return done(null, false);

            return done(null, user);
        } catch (err) {
            return done(err);
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

            const newCart = await Cart.create({ detail: [], purchased: false }); //check detail later
            const newUser = await User.create({
                google: { id: profile.id },
                username: profile.emails[0].value,
                password: null,
                cart: newCart,
                role: "normalUser"
            });
            return done(null, newUser);
        } catch (err) {
            return done(null, false);
        }
    }
))

export default passport;