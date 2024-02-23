import { faker } from '@faker-js/faker';

export const generateProduct = () =>{
return{
  id: faker.database.mongodbObjectId(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  code: faker.commerce.isbn(4),
  price: faker.commerce.price({ min: 100, max: 1500, dec: 2, symbol: '€' }),
  status: faker.datatype.boolean() ? 'active' : 'inactive',
  stock: faker.number.int(500),
  category: faker.commerce.department(),
  thumbnail: faker.image.url(300, 300) 
}
}