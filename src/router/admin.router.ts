import {AdminManagement} from "../controller/admin/adminManagement";
import express from 'express';
export const router = express.Router();
router.get("/", AdminManagement.showAdminHomePage);
router.get("/product/add/",AdminManagement.adminAddProduct)