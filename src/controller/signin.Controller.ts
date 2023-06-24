export class SigninController {
    static showFormSignin(req: any, res: any) {
        if (!res.locals.alertWrongAccountInfo) res.locals.alertWrongAccountInfo = false;
        if (!res.locals.alertSignupSuccess) res.locals.alertSignupSuccess = false;
        res.render('signin');
    }
}