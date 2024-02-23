import { Router } from 'express';
import ProductController from '../../controllers/productController.js';
import { authenticationMidd, authorizationMidd } from '../../middlewares/authMiddlewares.js';

const router = Router();

router.get('/products', async (req, res, next) => {
  try {
    const { query = {} } = req;
    const products = await ProductController.getProducts(query);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:pid', async (req, res, next) => {
  try {
    const {
      params: { pid },
    } = req;
    const product = await ProductController.getProdById(pid);
    res.status(200).json(product);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.post('/products', authenticationMidd('jwt'), authorizationMidd(['admin', 'premium']), async (req, res, next) => {
    try {
      const {
        body: { title, description, code, price, stock },
        user,
      } = req;

      if (!title || !description || !code || !price || !stock) {
        req.logger.fatal(
          'An error occurred while trying to create the product'
        );
        return res.status(400).send({
          message:
            'The fields title, description, code, price and stock are required',
        });
      }
      
      let productOwner = req.user.id

      const newProduct = await ProductController.createProduct({
        ...req.body,
        owner: productOwner,
      });
      req.logger.info('Product created successfully');
      res.status(201).json(newProduct);
    } catch (error) {
      next(
        res.status(error.statusCode || 500).json({ message: error.message })
      );
    }
  }
);

router.put('/products/:pid', authenticationMidd('jwt'), authorizationMidd(['admin', 'premium']), async (req, res, next) => {
    try {
      const {
        params: { pid },
        body,
        user
      } = req;
      await ProductController.updateProduct(pid, body, user.id);
      req.logger.info('Product successfully updated');
      res.status(201).send({message: `The following items were updated: ${body}`});
    } catch (error) {
      next(
        res.status(error.statusCode || 500).json({ message: error.message })
      );
    }
  }
);

router.delete('/products/:pid',authenticationMidd('jwt'),authorizationMidd(['admin', 'premium']), async (req, res, next) => {
    try {
      const {
        params: { pid },
        user
      } = req;
      await ProductController.deleteProduct(pid, user.id);
      req.logger.info('Product successfully removed');
      res.status(200).send({ message: 'Product successfully removed' });
    } catch (error) {
      next(
        res.status(error.statusCode || 500).json({ message: error.message })
      );
    }
  }
);

export default router;
