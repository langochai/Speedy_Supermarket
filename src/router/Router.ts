import {router as HomeRouter} from "./home.router";
import {router as LoginRouter} from "./signin_signout.router";
import {router as SignupRouter} from "./signup.router";
import {router as AdminRouter} from "./admin.router";
export const Router = (app)=>{
    app.use('/home',HomeRouter);
    app.use('/signin',LoginRouter);
    
    app.use('/signup',SignupRouter);
    app.use('/admin',AdminRouter);
}