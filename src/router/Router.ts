import {router as HomeRouter} from "./home.router";
import {router as SearchRouter} from "./search.router";
import {router as TestRouter} from "./test.router";
import {router as AdminRouter} from "./admin.router";
import {router as AuthRouter} from "./auth.router"

export const Router = (app)=>{
    app.use("/home",HomeRouter);
    app.use("/auth", AuthRouter)
    app.use("/search", SearchRouter);
    app.use("/test", TestRouter);
    app.use("/admin",AdminRouter);
}