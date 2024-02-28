import { Router } from 'express';
import CartController from '../../controllers/cartController.js';

const router = Router();

router.get("/cart/:cid", async (req, res, next) => {
  const { params: { cid } } = req;
  try {
    const result = await CartController.getCart(cid)
    res.render('cart', buildResponse(cid, result))
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

const buildResponse = (cid, data) => {
  const payload = data.products.map(product => product.toJSON())
    return {
        cartId: cid,
        payload
    }
};

export default router;
