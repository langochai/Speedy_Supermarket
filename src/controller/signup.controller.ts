import {Cart} from '../schemas/user.schemas/cart.model';
import {Role} from '../schemas/user.schemas/role.model';
import {User} from '../schemas/user.schemas/user.model';

export class SignupController {
    static showSignupPage(req: any, res: any) {
        res.render('signup');
    }

    static async createAccount(req: any, res: any) {
        const findUsername = await User.find({
            'username': req.body.username
        });
        if (findUsername.length !== 0) return res.send('this account is exist');
        const newRole = new Role({
            name: 'normalUser',
        });
        const newCart = new Cart({
            detail: [], // checklater
            purchased: false,
        });
        const newUser = new User({
            username: req.body.username, // string
            password: req.body.password, // string
            cart: newCart,
            role: newRole,
        });
        await newRole.save();
        await newCart.save();
        await newUser.save();
        res.redirect('/login');
    }
}