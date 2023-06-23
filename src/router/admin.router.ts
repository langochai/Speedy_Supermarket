import {AdminManagement} from "../controller/admin/adminManagement";
import express from 'express';
import multer from 'multer';
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
router.get("/", AdminManagement.showAdminHomePage);
router.get("/product/add/",AdminManagement.getAdminAddProduct)
router.post("/product/add/",upload.single('image'),AdminManagement.postAdminAddProduct)