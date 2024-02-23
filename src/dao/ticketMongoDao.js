import TicketModel from '../models/ticketModel.js';

export default class TicketDao {
  static async getAll(criteria, options) {
    return await TicketModel.paginate(criteria, options);
  }

  static async getById(tid) {
    return await TicketModel.findById(tid);
  }

  static async create(data) {
    const newProduct = new TicketModel(data);
    return await newProduct.save();
  }

  static async updateById(tid, data) {
    return await TicketModel.findByIdAndUpdate(tid, data, { new: true });
  }

  static async deleteById(tid) {
    return await TicketModel.findByIdAndDelete(tid);
  }

  static async findByPurchaser(email) {
    return TicketModel.find({ purchaser: email})
  }

  /* getTickets(criteria = {}){
    return TicketModel.find(criteria)
  }

  createTicket(data) {
    return TicketModel.create(data);
  }
  
  updateTicket(tid, data) {
    return TicketModel.updateOne({ _id: tid }, { $set: data});
  }

  deleteTicket(tid) {
    return TicketModel.deleteOne({ _id: tid});
  } */
}
