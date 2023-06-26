import { router as HomeRouter } from "./home.router";
import { router as AdminRouter } from "./admin.router";
import { router as AuthRouter } from "./auth.router";
export const Router = (app) => {
    app.use('/home', HomeRouter);
    app.use('/auth', AuthRouter);
    app.use('/admin', AdminRouter);
}