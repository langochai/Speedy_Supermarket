import { HomeController } from '../controller/home.Controller';
import express from 'express';
export const router = express.Router();
router.get("/home", HomeController.showHome);
