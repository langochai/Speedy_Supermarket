import { Cart } from '../schemas/user.schemas/cart.model';
import { User } from '../schemas/user.schemas/user.model';
import passport from '../middlewares/auth.middleware';
import bcrypt from 'bcrypt';

export class AuthController {
    static showSignupPage(req: any, res: any): void {
        res.render('signup', { alertUsernameExisted: false });
    }

    static showFormSignin(req: any, res: any) {
        if (!res.locals.alertWrongAccountInfo) res.locals.alertWrongAccountInfo = false;
        if (!res.locals.alertSignupSuccess) res.locals.alertSignupSuccess = false;
        res.render('signin');
    }

    static async createAccount(req: any, res: any) {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const usernameExists = await User.exists({ username });
            console.log(req.body, hashedPassword, usernameExists)

            if (usernameExists) return res.render('signup', { alertUsernameExisted: true });

            const newCart = await Cart.create({ detail: [], purchased: false }); //check detail later

            await User.create({
                username: req.body.username,
                password: hashedPassword,
                cart: newCart,
                role: 'normalUser',
            });

            res.redirect('/auth/signin');
        } catch (err) {
            res.render('error', { err });
        }
    }

    static async signin(req: any, res: any) {
        passport.authenticate('local');
    }

    static logout(req: any, res: any) {
        req.logout(function (err) {
            err ? res.render('error', { error: err }) : res.redirect('/home');
        });
    }

    static alertControl(req: any, res: any, next: any): void {
        if (req.headers.referer && req.headers.referer.endsWith('/signup')) {
            res.locals.alertUsernameExisted = false;
            res.locals.alertSignupSuccess = true;
        }
        next();
    }
}