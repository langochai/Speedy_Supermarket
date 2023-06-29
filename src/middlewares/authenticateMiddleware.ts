export class AuthenticateMiddleware {
    static checkUser(req,res,next){
        if(req.isAuthenticated()) next()
        else res.redirect("/auth/signin")
    }
}