import { gql, GraphQLClient } from 'graphql-request';
import { createConnection, getConnection } from 'typeorm';
import faker from 'faker';
import { Categories } from '../entities/categories';
import { Products } from '../entities/products';
import { createCategory, createProduct } from './utils/factory';

describe('PRODUCT INTERACTIONS', () => {
  let client: GraphQLClient;
  let category: Categories | undefined;
  const addProductsMutation = gql`
    mutation CreateProduct(
      $name: String!
      $sku: String!
      $price: String!
      $stockLevel: Int!
      $expiryDate: Date
      $categoryId: Int!
    ) {
      createProduct(
        name: $name
        sku: $sku
        price: $price
        stockLevel: $stockLevel
        expiryDate: $expiryDate
        categoryId: $categoryId
      ) {
        id
        name
        sku
        price
        stockLevel
        expiryDate
        categoryId
      }
    }
  `;
  const allProductsQuery = gql`
    query {
      products {
        id
        name
      }
    }
  `;

  beforeAll(async () => {
    client = new GraphQLClient(`${process.env.URL}`);
    await createConnection();
    await createCategory();
    category = await Categories.findOne({ relations: ['products'] });
  });

  afterAll(() => {
    getConnection().close();
  });

  test('should create a product', async () => {
    const variables = {
      name: 'tee shirt',
      sku: 'skunumbertest',
      price: '20.05',
      stockLevel: 20,
      categoryId: category?.id,
    };
    const response = await client.request(addProductsMutation, variables);
    expect(response.createProduct).toEqual({
      ...variables,
      id: '1',
      expiryDate: null,
    });
    const products = await Products.find();
    expect(products).toHaveLength(1);
  });

  test('should update a product', async () => {
    const product = await Products.findOne();
    const mutation = gql`
      mutation UpdateProduct($id: ID!, $name: String) {
        updateProduct(id: $id, name: $name) {
          id
          name
        }
      }
    `;
    const variables = {
      id: `${product?.id}`,
      name: faker.commerce.productName(),
    };
    await client.request(mutation, variables);
    const updatedProduct = await Products.findOne(product?.id);
    expect(updatedProduct?.name).toEqual(variables.name);
  });

  describe('should get', () => {
    beforeAll(async () => {
      await createProduct(category?.id);
    });

    test('all products', async () => {
      const response = await client.request(allProductsQuery);
      expect(response.products).toHaveLength(7);
    });

    test('a single product', async () => {
      const product = await Products.findOne(4);
      const query = gql`
        query product($id: ID!) {
          product(id: $id) {
            id
            name
          }
        }
      `;

      const response = await client.request(query, { id: 4 });
      expect(response.product).toEqual({
        id: `${product?.id}`,
        name: product?.name,
      });
    });
  });

  test('should delete a product', async () => {
    const product = await Products.findOne(3);
    const mutation = gql`
      mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id) {
          id
          name
        }
      }
    `;

    const response = await client.request(mutation, { id: 3 });
    expect(response.deleteProduct).toEqual({
      id: `${product?.id}`,
      name: product?.name,
    });
  });
});
