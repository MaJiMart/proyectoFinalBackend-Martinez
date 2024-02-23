import TicketModel from '../models/ticketModel.js';

export default class TicketController {
  static async createTicket(ticketData) {
    return TicketModel.create(ticketData)
  }
}


//----------------------------------------------------------------------//

/* import TicketModel from '../models/ticketModel.js';
import TicketService from '../services/ticketService.js';
import CartController from './cartController.js';
import ProductController from './productController.js';

export default class TicketController {
  static async processPurchase(cart) {
    const failedProductIds = [];
    try {
      let totalAmount = 0;

      for (const item of cart.products) {
        const product = await ProductController.getProdById(item.product);

        if (product.stock >= item.quantity) {
          await ProductController.updateProduct(
            product._id,
            product.stock - item.quantity
          );

          totalAmount += product.price * item.quantity;
        } else {
          failedProductIds.push(item.product.toString());
        }
      }

      // Crear un ticket solo si todos los productos tienen suficiente stock
      if (failedProductIds.length === 0) {
        const ticketData = {
          code: generateUniqueCode(),
          purchase_datetime: new Date(),
          amount: totalAmount,
          purchaser: cart.user.email,
        };
        const ticket = await TicketService.createTicket(ticketData);

        // Actualizar el carrito con productos no comprados
        await CartController.updateCartAfterPurchase(cart, failedProductIds);
        return { success: true, ticket };
      } else {
        return { success: false, failedProductIds };
      }
    } catch (error) {
      return { success: false, failedProductIds };
    }
  }
}

function generateUniqueCode() {
  let d = new Date().getTime();
  let id = 'xxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 4) % 4 | 0; //*16) % 16
    d = Math.floor(d / 4); //16
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(4); //(16)
  });
  return id;
} */

//---------------------------------------------------------------//

/* import TicketService from '../services/ticketService.js';
import CartController from './cartController.js';
import UserController from './userContoller.js';
import ProductController from './userContoller.js';
import { NotFound, Exception } from '../utilities.js';
import { get } from 'mongoose';

export default class TicketController {
  static async getTickets(query = {}) {
    return await TicketService.getTickets(query)
  }

  static async createTicket(data) {
    const { user: uid, cart: cid, products } = data
    const user = await UserController.getById(uid)
    const cart = await CartController.getCart(cid)
    const productsResult = cart.products.filter(p => products.includes(p._id));
    
    const newTicket = {
      code: generateID(),
      purchase_datetime: new Date(),
      purchaser: user.email,
      products: productsResult,
      amount: productsResult.reduce((total, product) => total + product.price, 0)
    };

    return TicketService.createTicket(newTicket)
  }

  static async finishOrder(tid, data) {
    const { status } = data
    return TicketService.updateTicket(tid, { status })
  }

  static async getById(tid) {
    const ticket = await TicketService.getTickets({ _id: tid });
    if (!ticket) {
      throw new NotFound(`The ticket with id ${uid}was not found`);
    }
    return ticket;
  }

  static async updateTicket(tid) {
    try {
      await TicketController.getById(tid);
      await TicketService.updateTicket(tid, data);
    } catch (error) {
      throw new Exception(`Error updating ticket: ${error.message}`, 500);
    }
  }

  static async deleteTicket(tid) {
    try {
      await TicketController.getById(tid);
      await TicketService.deleteTicket(tid);
    } catch (error) {
      throw new Exception(`Error deleting ticket: ${error.message}`, 500);
    }
  }
}

function generateID(){
  let d= new Date().getTime();
  let id = 'xxxxxxxxxx'.replace(/[xy]/g, function (c){
      let r = (d + Math.random() * 4) % 4 | 0; //*16) % 16
      d = Math.floor(d / 4); //16
      return (c == 'x' ? r: (r & 0x3 | 0x8)).toString(4); //(16)
  })
  return id
} */
