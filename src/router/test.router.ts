import { TestController } from './../controller/test.Controller';
import express from 'express';
export const router = express.Router();
router.get("/admin", TestController.showHomeAdmin);
router.get("/user", TestController.showHomeUser);