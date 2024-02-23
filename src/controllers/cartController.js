import CartService from '../services/cartService.js';
import ProductService from '../services/productService.js';
import ProductController from '../controllers/productController.js'
import UserService from '../services/userService.js';
import UserController from '../controllers/userContoller.js';
import TicketController from './ticketController.js';
import { NotFound, Exception, generateUniqueCode } from '../utilities.js';

export default class CartController {
  static async getCarts(query = {}) {
    try {
      const carts = await CartService.getCarts(query);
      return carts;
    } catch (error) {
      throw new Exception(`Error getting carts: ${error.message}`, 500);
    }
  }

  static async createCart(data) {
    try {
      return await CartService.createCart(data);
    } catch (error) {
      throw new Exception(`Error creating cart: ${error.message}`, 500);
    }
  }

  static async getCart(cid) {
    const cart = await CartService.getCart(cid);
    if (!cart) {
      throw new NotFound(`NOT FOUND: We can't find the cart with ID: ${cid}`);
    }
    return cart;
  }

  static async updateCart(cid, data) {
    try {
      await CartController.getCart(cid);
      await CartService.updateCart(cid, data);
    } catch (error) {
      throw new Exception(`Error updating cart: ${error.message}`, 500);
    }
  }

  static async updateQuantity(cid, pid, data) {
    try {
      const product = await ProductController.getProdById(pid);
      if (product.stock < data.quantity) {
        throw new Exception('Sorry, the product dont have enough stock', 403)
      }
      
      return await CartService.updateQuantity(cid, pid, data);
    } catch (error) {
      throw new Exception(`Error adding product: ${error.message}`, 500);
    }
  }

  static async addProductToCart(cid, pid, uid) {
    try {
      const cart = await CartController.getCart(cid);
      if (!cart) {
        throw new NotFound(
          `NOT FOUND: We can't find the cart with ID: ${cid}`);
      }

      const owner = await UserController.getById(uid) ;
      const product = await ProductController.getProdById(pid);

      if (product.stock === 0) {
        throw new Exception('Sorry, the product dont have enough stock', 403)
      }
      
      if (product.owner === owner.id) {
        throw new Exception('Sorry, you cant add your own products to the cart', 403)
      }

      return await CartService.addProductToCart(cid, pid);
    } catch (error) {
      throw new Exception(`Error adding product: ${error.message}`, 500);
    }
  }

  static async deleteProductToCart(cid, pid) {
    return await CartService.deleteProductToCart(cid, pid);
  }

  static async emptyCart(cid) {
    return await CartService.emptyCart(cid);
  }

  static async purchaseCart(cid, user) {
    try {
      const cart = await CartController.getCart(cid);
      const userEmailAddress = user;
      const failedProducts = [];
      const purchasedProducts = [];
      let amount = 0;

      for (const cartProduct of cart.products) {
        
        const product = await ProductService.getProduct(cartProduct.product);
        product.stock -= cartProduct.quantity;
        await product.save()
        amount += product.price * cartProduct.quantity;
        
        /* if (product.stock >= cartProduct.quantity) {
          product.stock -= cartProduct.quantity;
          await product.save();

          purchasedProducts.push({
            product: cartProduct.product,
            quantity: cartProduct.quantity,
          });

          amount += product.price * cartProduct.quantity;
          console.log(amount);
        } else {
          failedProducts.push(cartProduct.product);
        } */
      }

      const remainingProducts = cart.products.filter(
        (cartProduct) =>
          !failedProducts.includes(cartProduct.product.toString())
      );

      cart.products = remainingProducts;
      await cart.save();

      const ticket = await TicketController.createTicket({
        code: generateUniqueCode(),
        amount: amount,
        purchaser: userEmailAddress
      });
      console.log('Ticket:', ticket);
    } catch (error) {
      throw new Exception(
        `Error processing the purchase: ${error.message}`,
        500
      );
    }
  }
}
