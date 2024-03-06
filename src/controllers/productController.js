import ProductService from '../services/productService.js';
import { Exception, NotFound } from '../utilities.js';
import UserController from './userContoller.js';
import MailService from '../services/mailService.js';

export default class ProductController {
  static async getProducts(query = {}) {
    return await ProductService.getProducts(query);
  }

  static async getProdById(pid) {
    const product = await ProductService.getProduct(pid);
    if (!product) {
      throw new NotFound(`NOT FOUND: Product with ID: ${pid} not found`, 404);
    }
    return product;
  }

  static async createProduct(data) {
    try {
      return await ProductService.createProduct(data);
    } catch (error) {
      throw new Exception(`Error creating product: ${error.message}`, 500);
    }
  }

  static async updateProduct(pid, data, user) {
    try {
      const owner = await UserController.getById(user)

      if (owner.role === 'admin') {
        await ProductController.getProdById(pid);
        await ProductService.updateProduct(pid, data);

      }else if (owner.role === 'premium') {
        const product = await ProductController.getProdById(pid);
        
        if (product.owner.toString() === owner.id) {
          await ProductService.updateProduct(pid, data);
        }else {
          throw new Exception('You can only modify products registered with your ID.', 403);
        }
      } else {
        throw new Exception('Permission denied. You cant modify products', 403);
      }

      
    } catch (error) {
      throw new Exception(`Error updating product: ${error.message}`, 500);
    }
  }

  static async deleteProduct(pid, user) {
    try {
      const owner = await UserController.getById(user)
      const product = await ProductController.getProdById(pid);
      if (owner.role === 'admin') {
        if (product.owner.toString() !== owner.id) {
          const idowner = product.owner.toString()
          const powner = await UserController.getById(idowner)
          MailService.sendEmail(
            powner.email,
            'Your product has been removed',
            `
              <div>
                <h1>Hi ${powner.first_name},</h1>
                <p>We want to inform you that your product ${product.title} has been deleted by an administrator.</p>
                <br>Greetings,</br>
              </div> 
            `,
          );
        }
        await ProductService.deleteProduct(pid);
      }else if (owner.role === 'premium') {      
        if (product.owner.toString() === owner.id) {
          await ProductService.deleteProduct(pid);
        }else {
          throw new Exception('You can only delete products registered with your ID.', 403);
        }
      } else {
        throw new Exception('Permission denied. You cant delete products', 403);
      }
    } catch (error) {
      throw new Exception(`Error deleting product: ${error.message}`, 500);
    }
  }
}
 
