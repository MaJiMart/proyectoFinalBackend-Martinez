import { cartRepository } from '../repositories/index.js';

export default class CartService {
  static getCarts(filter = {}) {
    return cartRepository.getCarts(filter);
  }

  static getCart(cid) {
    return cartRepository.getCart(cid)
  }

  static async createCart(payload) {
    const newCart = await cartRepository.createCart(payload);
    console.log(`Successfully created cart (ID: ${newCart._id})`);
    return newCart;
  }

  static updateCart(cid, payload) {
    return cartRepository.updateCart(cid, payload);
  }

  static updateQuantity(cid, pid, payload) {
    return cartRepository.updateQuantity(cid, pid, payload);
  }

  static addProductToCart(cid, pid) {
    return cartRepository.addProductToCart(cid, pid);
  }

  static deleteProductToCart(cid, pid) {
    return cartRepository.deleteProductToCart(cid, pid);
  }

  static emptyCart(cid) {
    return cartRepository.emptyCart(cid);
  }
}
