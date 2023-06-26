import { Cart } from '../schemas/user.schemas/cart.model';
import { Role } from '../schemas/user.schemas/role.model';
import { User } from '../schemas/user.schemas/user.model';

export class AuthController {
    static showSignupPage(req: any, res: any): void {
        res.render('signup', { alertUsernameExisted: false });
    }

    static async createAccount(req: any, res: any): Promise<any> {
        const usernameExists = await User.exists({ username: req.body.username });
        if (usernameExists) return res.render('signup', { alertUsernameExisted: true });

        const [newRole, newCart] = await Promise.all([
            new Role({ name: 'normalUser' }).save(),
            new Cart({ detail: [], purchased: false }).save(), //check detail later
        ]);

        await new User({
            username: req.body.username,
            password: req.body.password,
            cart: newCart,
            role: newRole,
        }).save();

        res.redirect('/auth/signin');
    }

    static alertControl(req: any, res: any, next: any): void {
        if (req.headers.referer && req.headers.referer.endsWith('/signup')) {
            res.locals.alertUsernameExisted = false;
            res.locals.alertSignupSuccess = true;
        }
        next();
    }

    static showFormSignin(req: any, res: any) {
        if (!res.locals.alertWrongAccountInfo) res.locals.alertWrongAccountInfo = false;
        if (!res.locals.alertSignupSuccess) res.locals.alertSignupSuccess = false;
        res.render('signin');
    }

    static logout(req: any, res: any) {
        
    }
}