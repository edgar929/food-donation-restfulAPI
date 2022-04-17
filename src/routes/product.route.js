import express from 'express';
import productController from '../controller/productController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/create', auth, productController.createProduct);
router.get('/get', productController.getProducts);

export default router;