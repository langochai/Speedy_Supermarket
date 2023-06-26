import {AdminManagement} from "../controller/admin/adminManagement";
import express from 'express';
import multer from 'multer';
import { Authorize } from "../middlewares/author";
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/index/uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.productName + req.body.price + file.originalname);
    }
})
const upload = multer({ storage: storage });
export const router = express.Router();
// router.use(Authorize.authorizeAdmin)
router.get("/", AdminManagement.showAdminHomePage);
router.get("/product/add/",AdminManagement.getAdminAddProduct)
router.post("/product/add/",upload.single('image'),AdminManagement.postAdminAddProduct)
router.get("/product/update/:id",AdminManagement.getAdminUpdateProduct)
router.post("/product/update/:id",upload.single('image'),AdminManagement.postAdminUpdateProduct)
router.get("/product/delete/:id",AdminManagement.getAdminDeleteProduct)
router.post("/product/delete/:id",AdminManagement.postAdminDeleteProduct)
router.post("/product/search/:name", AdminManagement.adminSearchProduct)