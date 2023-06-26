import { LoginController } from '../controller/login.Controller';
import express from 'express';
export const router = express.Router();
router.get("/login", LoginController.showFormLogin);