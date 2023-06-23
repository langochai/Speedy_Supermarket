import { SigninController } from '../controller/signin.Controller';
import express from 'express';
export const router = express.Router();
router.get("/", SigninController.showFormSignin);
router.post("/", SigninController.signin);