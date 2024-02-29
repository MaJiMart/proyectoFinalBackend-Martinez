import { Router } from 'express';
import CartController from '../../controllers/cartController.js';
import { authenticationMidd } from '../../middlewares/authMiddlewares.js'

const router = Router();

router.get("/cart/:cid", authenticationMidd('jwt'), async (req, res, next) => {
  const { params: { cid } } = req;
  try {
    const result = await CartController.getCart(cid)
    const products = result.products;
    res.render('cart', buildResponse(cid, products))
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

const buildResponse = (cid, data) => {
  const payload = data.map(product => product.toJSON())
    return {
        cartId: cid,
        payload
    }
};

export default router;
