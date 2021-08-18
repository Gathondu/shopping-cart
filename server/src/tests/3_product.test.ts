import { gql, GraphQLClient } from 'graphql-request';
import { createConnection, getConnection, getManager } from 'typeorm';
import { Categories } from '../entities/categories';
import { Products } from '../entities/products';
import { createCategory } from './utils/factory';

describe('PRODUCT INTERACTIONS', () => {
  let client: GraphQLClient;
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
    await createCategory('clothing');
  });

  afterAll(() => {
    getConnection().close();
  });

  test('should create a product', async () => {
    const category = await getManager().findOne(Categories);
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
});
