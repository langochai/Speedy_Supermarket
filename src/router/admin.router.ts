import {AdminManagement} from "../controller/admin/adminManagement";
import express from 'express';
import multer from 'multer';
const upload = multer({
    dest:'public/index/uploads'
})
export const router = express.Router();
router.get("/", AdminManagement.showAdminHomePage);
router.get("/product/add/",AdminManagement.getAdminAddProduct)
router.post("/product/add/",upload.single('image'),AdminManagement.postAdminAddProduct)