import { AuthController } from '../controller/auth.controller';
import express from 'express';
import passport from '../middlewares/auth.middleware';
export const router = express.Router();
router.get("/signup", AuthController.showSignupPage);
router.post("/signup", AuthController.createAccount);

router.get("/signin", AuthController.alertControl, AuthController.showFormSignin);
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) return res.render('signin', { alertWrongAccountInfo: true, alertSignupSuccess: false });
        req.logIn(user, (err) => {
            err ? next(err) : res.redirect('/home');
        });
        res.locals.user = req.user;
    })(req, res, next);
});

router.get('/logout', (req, res)=>{
    req.logOut;
    res.redirect('/home');
});