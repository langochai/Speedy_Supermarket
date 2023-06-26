import { SearchController } from '../controller/search.Controller';
import express from 'express';
export const router = express.Router();
router.post("/", SearchController.productsSearch);