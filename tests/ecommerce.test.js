import { expect } from 'chai';
/* import mongoose from 'mongoose'; */
import supetest from 'supertest';
import config from '../src/config/config.js';

/* const dataBaseTest = config.mongodbTest */
const PORT = config.port; 
const requester = supetest(`http://localhost:${PORT}`);

describe('Ecommerce test', () => {
  /* before(async function () {
    
    await mongoose.connect(dataBaseTest);
  }); */

  /* beforeEach(async () => {
    await mongoose.connection.collections.users.drop()
  }); */

  /* after(async function() {
    await mongoose.connection.close();
  }); */

  describe('Authentication test', () => {

    let cookie;

    it('Should register a user successfully', async function(){
      const userMock = {
        first_name: 'Super',
        last_name: 'Test',
        email: 'supertest@mail.com',
        password: '9876',
        role: 'admin'
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.post('/api/auth/register').send(userMock);
      expect(statusCode).to.be.equal(400);
      expect(ok).to.be.not.ok;
      expect(_body).to.be.has.property('message', 'Already registered user')
    });
    
    it('Should loguear a user successfully', async function(){
      const credentialMock = {
        email: 'supertest@mail.com',
        password: '9876'
      };
      const {
        headers,
        statusCode,
        ok,
        _body,
      } = await requester.post('/api/auth/login').send(credentialMock);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('status', 'success');
      const [key, value] = headers['set-cookie'][0].split('=');
      cookie = { key, value };
    });

    it('Should get the user logged in successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.get('/current').set('Cookie', [`${cookie.key}=${cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('email', 'supertest@mail.com')
    });
  });
  
  describe('Product test', () => {
    before(async function() {
      const credentialMock = {
        email: 'supertest@mail.com',
        password: '9876'
      };
      const { headers } = await requester.post('/api/auth/login').send(credentialMock);
      const [key, value] = headers['set-cookie'][0].split('=');
      cookie = { key, value };
    });

    let cookie;
    let pid;

    it('Should get all products successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.get('/api/products')
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok
      expect(_body).to.be.an('array')
    });

    it('Should create a product successfully', async function(){
      const prodMock = {
        title: 'Sponges',
        description: 'Supertest sponges',
        code: 'SUP987',
        price: 98,
        stock: 50
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.post('/api/products').set('Cookie', [`${cookie.key}=${cookie.value}`]).send(prodMock);
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.ok;
      expect(_body).to.be.an('object')
      expect(_body).to.be.has.property('id')
      pid = _body.id
    });

    it('Should get a product by its ID successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.get(`/api/products/${pid}`)
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok
      expect(_body).to.be.an('object')
      expect(_body._id).to.be.equal(pid)
    });

    it('Should update a product successfully', async function(){
      const updateProd = {
        category: 'Gifts',
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.put(`/api/products/${pid}`).set('Cookie', [`${cookie.key}=${cookie.value}`]).send(updateProd);
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message')
    });

    it('Should delete a product successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.delete(`/api/products/${pid}`).set('Cookie', [`${cookie.key}=${cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message', 'Product successfully removed');
    });
  });

  describe('Carts test', () => {
    before(async function() {
      const credentialMock = {
        email: 'elflaco@mail.com',
        password: '9876'
      };
      const { headers } = await requester.post('/api/auth/login').send(credentialMock);
      const [key, value] = headers['set-cookie'][0].split('=');
      cookie = { key, value };
    });

    let cookie;
    let cid;
    let pid = '654b5e5b56d479b6759e7dcc';

    it('Should get all carts successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.get('/api/carts')
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok
      expect(_body).to.be.an('array')
    });

    it('Should create a cart successfully', async function(){
      const cartMock = {
        products: []
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.post('/api/carts').send(cartMock);
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.ok;
      expect(_body).to.be.an('object');
      expect(_body).to.be.has.property('_id');
      cid = _body._id;
    });

    it('Should get a cart by its ID successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.get(`/api/carts/${cid}`)
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.an('object');
      expect(_body._id).to.be.equal(cid);
    });

    it('Should update a cart successfully', async function(){
      const updateCart = {
        products: [
        {
          product: pid,
				  quantity: 2
        }
        ]
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.put(`/api/carts/${cid}`).send(updateCart);
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message');
    });

    it('Should update quantity of a product in the cart successfully', async function(){
      const updateQuant = {
				  quantity: 3
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.put(`/api/carts/${cid}/products/${pid}`).send(updateQuant);
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message');
    });
    
    it('Should add a product on the cart successfully', async function(){
      pid = '65c764269ec983a8652f1500'
      const {
        statusCode,
        ok,
        _body,
      } = await requester.post(`/api/carts/${cid}/products/${pid}`).set('Cookie', [`${cookie.key}=${cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message');
    });
    
    it('Should delete a product from the cart successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.delete(`/api/carts/${cid}/products/${pid}`)
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message');
    });
    
    it('Should delete all the products from the cart successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.delete(`/api/carts/${cid}`)
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message');
    });
  })
})