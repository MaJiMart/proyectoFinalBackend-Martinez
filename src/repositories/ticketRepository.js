export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getTickets(criteria = {}) {
    const users = await this.dao.getTickets(criteria);
    return users;
  }

  async createTicket(data) {
    return await this.dao.createTicket(data);
  }

  async updateTicket(uid, data) {
    return new UserDTO(await this.dao.updateTicket(uid, data));
  }

  async deleteTicket(uid) {
    return new UserDTO(await this.dao.deleteTicket(uid));
  }
}
