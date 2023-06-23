import { TestController } from './../controller/test.Controller';
import express from 'express';
export const router = express.Router();
router.get("/", TestController.showHomeAdmin);
router.get("/", TestController.showHomeUser);