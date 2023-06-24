import { Cart } from '../schemas/user.schemas/cart.model';
import { Role } from '../schemas/user.schemas/role.model';
import { User } from '../schemas/user.schemas/user.model';

export class SignupController {
    static showSignupPage(req: any, res: any): void {
        res.render('signup', { alertUsernameExisted: false });
    }

    static async createAccount(req: any, res: any): Promise<any> {
        const findUsername = await User.find({'username': req.body.username});
        if (findUsername.length !== 0) return res.render('signup', { alertUsernameExisted: true });

        const newRole = new Role({name: 'normalUser'});
        const newCart = new Cart({
            detail: [], // checklater
            purchased: false,
        });
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            cart: newCart,
            role: newRole
        });

        await newRole.save();
        await newCart.save();
        await newUser.save();
        res.redirect('/signin');
    }

    static alertControl(req: any, res: any, next: any): void {
        if (req.headers.referer && req.headers.referer.endsWith('/signup')) {
            res.locals.alertUsernameExisted = false;
            res.locals.alertSignupSuccess = true;
        }
        next();
    }
}