import { HomeController } from '../controller/home.Controller';
import { AuthController } from '../controller/auth.controller';
import express from 'express';
export const router = express.Router();

router.get("/", HomeController.showHome);