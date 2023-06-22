import { User } from '../schemas/user.schemas/user.model';

export class LoginController {
    static showFormLogin(req: any, res: any) {
        res.render("signin");
    }
    static async login(req: any, res: any) {
        const { username, password } = req.body //string
        const findUser = await User.find({
            $and: [
                { 'username': username },
                { 'password': password }
            ]
        });
        console.log(findUser);
        res.redirect('/home');
    }
}