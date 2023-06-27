import { AuthController } from '../controller/auth.controller';
import express from 'express';
import passport from '../middlewares/auth.middleware';
import { HomeController } from '../controller/home.Controller';
export const router = express.Router();
router.get("/signup", AuthController.showSignupPage);
router.post("/signup", AuthController.createAccount);

router.get("/googleSignIn", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", passport.authenticate('google'), (req, res) => { res.redirect('/home') });

router.get("/signin", AuthController.alertControl, AuthController.showFormSignin);
router.post('/signin', passport.authenticate('local'), HomeController.showHome);

router.get('/logout', AuthController.logout);