import express from 'express';
import { AdminManagement } from "../controller/admin/adminManagement";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";
import { AdminShowUserList } from "../controller/admin/adminShowUserList";
export const router = express.Router();
router.use(AuthorizeMiddleware.authorizedAdmin)
router.get("/", AdminManagement.showAdminHomePage);
router.get("/product/add/", AdminManagement.getAdminAddProduct)
router.post("/product/add/", AdminManagement.postAdminAddProduct)
router.get("/product/update/:id", AdminManagement.getAdminUpdateProduct)
router.post("/product/update/:id", AdminManagement.postAdminUpdateProduct)
router.get("/product/delete/:id", AdminManagement.getAdminDeleteProduct)
router.post("/product/delete/:id", AdminManagement.postAdminDeleteProduct)
router.post("/product/search/:name", AdminManagement.adminSearchProduct)

router.get('/user', AdminShowUserList.showUser)
router.get('/user/id/:id', AdminShowUserList.showCart)
