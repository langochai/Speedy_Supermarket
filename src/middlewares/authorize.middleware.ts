export class AuthorizeMiddleware{
    static authorizedAdmin(req,res,next){
        req.user.role !== "admin"? res.redirect("/home"):next()
    }
}