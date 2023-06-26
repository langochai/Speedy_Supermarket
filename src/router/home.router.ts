import { UserManagement } from './../controller/user/userManagement';
import { HomeController } from '../controller/home.Controller';
import express from 'express';
export const router = express.Router();

router.get("/", HomeController.showHome);
router.get("/user", UserManagement.showUserHomePage)
