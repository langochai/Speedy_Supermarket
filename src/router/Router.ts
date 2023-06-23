import {router as HomeRouter} from "./home.router";
import {router as LoginRouter} from "./login.router";
import {router as SearchRouter} from "./search.router";
import {router as TestRouter} from "./test.router";
export const Router = (app)=>{
    app.use('/home',HomeRouter)
    app.use('/login',LoginRouter)
    app.use("/admin/search", SearchRouter);
    app.use("/admin", TestRouter)
    app.use("/user", TestRouter)
}