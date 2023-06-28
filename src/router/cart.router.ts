import { CartController } from '../controller/user/cart.Controller';
import express from 'express';
export const router = express.Router();
router.get("/", CartController.showCart);
router.get("/123", CartController.addProductToCart);
router.get("/1234-:check", CartController.changeProductQuantity);
router.get("/:cartID", CartController.purchase);

