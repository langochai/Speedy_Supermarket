import {router as HomeRouter} from "./home.router";
import {router as SearchRouter} from "./search.router";
import {router as AdminRouter} from "./admin.router";
import {router as AuthRouter} from "./auth.router"
import {AuthenticateMiddleware} from "../middlewares/authenticateMiddleware";

export const Router = (app)=>{
    app.use("/home",HomeRouter);
    app.use("/auth", AuthRouter)
    app.use("/search", SearchRouter);
    app.use(AuthenticateMiddleware.checkUser)
    app.use("/admin",AdminRouter);
}