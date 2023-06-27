import {router as HomeRouter} from "./home.router";
import {router as LoginRouter} from "./login.router";
import {router as SignupRouter} from "./signup.router";
import {router as AdminRouter} from "./admin.router";
import {router as CartRouter} from "./cart.router";
import { CartController } from "../controller/user/cart.Controller";
export const Router = (app)=>{
    app.use('/home',HomeRouter);
    app.use('/signin',LoginRouter);
    app.use('/signup',SignupRouter);
    app.use('/admin',AdminRouter);
    app.use('/cart',CartRouter);
}