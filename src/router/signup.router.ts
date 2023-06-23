import { SignupController } from '../controller/signup.controller';
import express from 'express';
export const router = express.Router();
router.get("/", SignupController.showSignupPage);
router.post("/", SignupController.createAccount);