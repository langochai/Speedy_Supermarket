import { User } from '../schemas/user.schemas/user.model';

export class SigninController {
    static showFormSignin(req: any, res: any) {
        res.render("signin", { accountInfo: false, alertSignupSuccess: false });
    }
    static async signin(req: any, res: any) {
        const findUser = await User.find({
            $and: [
                { 'username': req.body.username },
                { 'password': req.body.password },
            ]
        });
        res.locals.alertSignupSuccess = false;
        findUser.length === 0 ? res.render('signin', { accountInfo: true }) : res.redirect('/home');
    }
}