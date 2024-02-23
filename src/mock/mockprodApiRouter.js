import { Router } from 'express';
import { generateProduct } from './utils.js';

const router = Router();

router.get('/mockingproducts', async (req, res, next) => {
  try {
    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

export default router;