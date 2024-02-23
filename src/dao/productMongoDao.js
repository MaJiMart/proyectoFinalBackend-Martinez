import ProductModel from '../models/productModel.js';

export default class ProductsDao {
  getProducts(criteria = {}, opts = {}) {
    return ProductModel.find(criteria, opts);
  }

  getProduct(pid) {
    return ProductModel.findById(pid);
  }

  createProduct(data) {
    return ProductModel.create(data);
  }

  updateProduct(pid, data){
    return ProductModel.updateOne({ _id: pid }, { $set: data });
  }

  deleteProduct(pid) {
    return ProductModel.deleteOne({ _id: pid})
  }
}
