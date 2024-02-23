export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCarts(criteria = {}) {
    return await this.dao.getCarts(criteria);
  }

  async getCart(cid) {
    return await this.dao.getCart(cid)
  }

  async createCart(data) {
    return await this.dao.createCart(data);
  }

  async updateCart(cid, data) {
    return await this.dao.updateCart(cid, data);
  }

  async updateQuantity(cid, pid, data) {
    return await this.dao.updateQuantity(cid, pid, data)
  }

  async addProductToCart(cid, pid) {
    return await this.dao.addProductToCart(cid, pid);
  }

  async deleteProductToCart(cid, pid) {
    return await this.dao.deleteProductToCart(cid, pid);
  }

  async emptyCart(cid) {
    return await this.dao.emptyCart(cid);
  }

}
