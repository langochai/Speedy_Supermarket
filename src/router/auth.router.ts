import { AuthController } from '../controller/auth.controller';
import express from 'express';
import passport from '../middlewares/auth.middleware';
export const router = express.Router();
router.get("/signup", AuthController.showSignupPage);
router.post("/signup", AuthController.createAccount);

router.get("/googleSignIn", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", passport.authenticate('google'), (req, res) => { res.redirect('/home') });

router.get("/signin", AuthController.alertControl, AuthController.showFormSignin);
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) return res.render('signin', { alertWrongAccountInfo: true, alertSignupSuccess: false });
        req.logIn(user, (err) => {
            err ? next(err) : res.redirect('/home');
        });
    })(req, res, next);
});

router.get('/logout', AuthController.logout);