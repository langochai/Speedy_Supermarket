export class Authorize {
    static authorizeAdmin(req, res, next) {
        req.user.role === "admin" ? next() : res.redirect("/home")        
    }
    
    static authorizeUser(req, res, next) {
        if (req.user.role !== "admin") {
            next()
        } else {
            res.redirect("/")
        }
    }
    
    static authorizeLogin(req, res, next) {
        if (req.user) {
            next()
        } else {
            res.redirect("/auth/signin")
        }
    }
}
