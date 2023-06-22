import {router as HomeRouter} from "./home.router";
import {router as LoginRouter} from "./login.router";
export const Router = (app)=>{
    app.use('/home',HomeRouter)
    app.use('/login',LoginRouter)
}