import { Router } from 'express';
import { authenticationMidd, authorizationMidd } from '../../middlewares/authMiddlewares.js';
import CartController from '../../controllers/cartController.js';

const router = Router();

router.get('/carts', async (req, res, next) => {
  try {
    const { query = {} } = req;
    const carts = await CartController.getCarts(query);
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
});

router.post('/carts', async (req, res, next) => {
  try {
    const { body } = req;
    const newCart = await CartController.createCart(body);
    res.status(201).json(newCart);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.get('/carts/:cid', async (req, res, next) => {
  try {
    const {
      params: { cid },
    } = req;
    const cart = await CartController.getCart(cid);
    res.status(200).json(cart);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.put('/carts/:cid', async (req, res, next) => {
  try {
    const {
      params: { cid },
      body,
    } = req;
    await CartController.updateCart(cid, body);
    res.status(201).send({message: 'Cart updated successfully'});
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.put('/carts/:cid/products/:pid', async (req, res, next) => {
  try {
    const {
      params: { cid, pid },
      body: { quantity }, 
    } = req;
    await CartController.updateQuantity(cid, pid, { quantity });
    req.logger.info('Product quantity successfully updated');
    res.status(201).send({ message: 'Product quantity successfully updated' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.post('/carts/:cid/products/:pid', authenticationMidd('jwt'), authorizationMidd(['user', 'premium']),async (req, res, next) => {
  try {
    const {
      params: { cid, pid },
      user
    } = req;
    await CartController.addProductToCart(cid, pid, user.id);
    req.logger.info('Product added to cart successfully');
    res.status(200).send({ message: 'Product added to cart successfully' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.delete('/carts/:cid/products/:pid', async (req, res, next) => {
  try {
    const {
      params: { cid, pid },
    } = req;
    await CartController.deleteProductToCart(cid, pid);
    req.logger.info('Product removed from cart successfully');
    res.status(200).send({ message: 'Product removed from cart successfully' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.delete('/carts/:cid', async (req, res, next) => {
  try {
    const {
      params: { cid },
    } = req;
    await CartController.emptyCart(cid);
    req.logger.info('The products have been successfully removed from the cart');
    res.status(200).send({ message: 'The products have been successfully removed from the cart' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.post('/carts/:cid/purchase', authenticationMidd('jwt'), authorizationMidd('user'), async (req, res, next) => {
  try {
    const {
      params: { cid },
      user
    } = req;
    
    await CartController.purchaseCart(cid, user.email)
    req.logger.info('Purchase completed successfully');
    res.status(201).send({ message: 'Purchase completed successfully' })
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }))
  }
})

export default router;