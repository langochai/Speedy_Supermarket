import {router as HomeRouter} from "./home.router";
import {router as LoginRouter} from "./login.router";
import {router as SignupRouter} from "./signup.router";
export const Router = (app)=>{
    app.use('/home',HomeRouter);
    app.use('/signin',LoginRouter);
    app.use('/signup',SignupRouter);
}