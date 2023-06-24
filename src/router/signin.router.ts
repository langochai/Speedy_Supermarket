import { SigninController } from '../controller/signin.Controller';
import { SignupController } from '../controller/signup.controller';
import passport from '../middlewares/auth.middleware';
import express from 'express';
export const router = express.Router();

router.use(SignupController.alertControl);
router.get("/", SigninController.showFormSignin);

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) return res.render('signin', { alertWrongAccountInfo: true, alertSignupSuccess : false});
        req.logIn(user, (err) => {
            err ? next(err) : res.redirect('/home');
        });
    })(req, res, next); //chay cai nay xong
});
// router.use((req: any, res: any, next: any) => { // phai chay cai nay
//     if (req.isAuthenticated()) {
//         console.log('aaaaaaaaaa')
//         res.locals.userLogin = req.user;
//         next();
//     } else {
//         res.redirect('/login');
//     }
// });

