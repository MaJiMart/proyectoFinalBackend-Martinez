import TicketDao from '../dao/ticketMongoDao.js';

export default class TicketService {
  static findAll(filter = {}) {
    return TicketDao.get(filter);
  }

  static async create(data) {
    return await TicketDao.create(data);
  }

  static findById(tid) {
    return TicketDao.getById(tid);
  }

  static updateById(tid, data) {
    return TicketDao.updateById(tid, data);
  }

  static deleteById(tid) {
    return TicketDao.deleteById(tid);
  }

  /* static findByPurchaser(email) {
    return TicketDao.findByPurchaser(email)
  } */
}
