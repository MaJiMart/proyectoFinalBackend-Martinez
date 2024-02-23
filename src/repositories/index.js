//User
import UserRepository from './userRepository.js';
import UserDao from '../dao/userMongoDao.js';
//Product
import ProductRepository from './productRepository.js';
import ProductsDao from '../dao/productMongoDao.js';
//Cart
import CartRepository from './cartRepository.js';
import CartDao from '../dao/cartMongoDao.js';
//Ticket
import TicketRepository from './ticketRepository.js';
import TicketDao from '../dao/ticketMongoDao.js';

//User
export const userRepository = new UserRepository(new UserDao());
//Product
export const productRepository = new ProductRepository(new ProductsDao());
//Cart
export const cartRepository = new CartRepository(new CartDao())
//Ticket
export const ticketRepository = new TicketRepository(new TicketDao())