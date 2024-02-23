import { productRepository } from '../repositories/index.js';

export default class ProductService {
  static getProducts(filter = {}, opts = {}) {
    return productRepository.getProducts(filter, opts);
  }

  static getProduct(pid) {
    return productRepository.getProduct(pid);
  }

  static createProduct(payload) {
    const product = productRepository.createProduct(payload);
    return product
  }

  static updateProduct(pid, payload) {
    return productRepository.updateProduct(pid, payload);
  }

  static deleteProduct(pid) {
    return productRepository.deleteProduct(pid);
  }
}
