import { CartController } from '../controller/user/cart.Controller';
import express from 'express';
export const router = express.Router();
router.get("/", CartController.showCart);
router.get("/add/:id", CartController.addProductToCart);
router.get("/delete/:idDelete", CartController.addProductToCart);

