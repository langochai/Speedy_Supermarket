import { SigninController } from '../controller/signin.Controller';
import { SignupController } from '../controller/signup.controller';
import passport from '../middlewares/auth.middleware';
import express from 'express';
export const router = express.Router();

router.get('/logout',)

router.use(SignupController.alertControl);
router.get("/", SigninController.showFormSignin);

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) return res.render('signin', { alertWrongAccountInfo: true, alertSignupSuccess : false});
        req.logIn(user, (err) => {
            err ? next(err) : res.redirect('/home');
        });
        res.locals.user = req.user;
    })(req, res, next);
});

