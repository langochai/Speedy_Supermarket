import { SearchController } from '../controller/user/search.Controller';
import express from 'express';
export const router = express.Router();
router.post("/", SearchController.productsSearch);