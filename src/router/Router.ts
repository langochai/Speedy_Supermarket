import {router as HomeRouter} from "./home.router";
import {router as SearchRouter} from "./search.router";
import {router as AdminRouter} from "./admin.router";
import {router as AuthRouter} from "./auth.router"

export const Router = (app)=>{
    app.get("/",(req, res)=>{
        res.redirect("/home")
    });
    app.use("/home", HomeRouter);
    app.use("/auth", AuthRouter)
    app.use("/search", SearchRouter);
    app.use("/admin", AdminRouter);
}