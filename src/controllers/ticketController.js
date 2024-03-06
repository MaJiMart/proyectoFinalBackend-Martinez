import TicketModel from '../models/ticketModel.js';

export default class TicketController {
  static async createTicket(ticketData) {
    return TicketModel.create(ticketData)
  }
}