import { gql, GraphQLClient } from 'graphql-request';
import faker from 'faker';

const client = new GraphQLClient(`${process.env.URL}`);
let count = 5;

export const createUser = async (): Promise<void> => {
  const addUserMutation = gql`
    mutation AddUser($firstName: String!, $lastName: String!) {
      createUser(firstName: $firstName, lastName: $lastName) {
        id
      }
    }
  `;
  await client.request(addUserMutation, {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  });
};

export const createCategory = async (): Promise<void> => {
  const addCategoryMutation = gql`
    mutation AddCategory($name: String!) {
      createCategory(name: $name) {
        id
      }
    }
  `;
  await client.request(addCategoryMutation, { name: faker.commerce.product() });
};

export const createProduct = async (
  categoryId: number | undefined,
): Promise<void> => {
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
      }
    }
  `;
  const response = await client.request(addProductsMutation, {
    name: faker.unique(faker.commerce.productName),
    sku: faker.datatype.uuid(),
    price: faker.commerce.price(),
    stockLevel: 20,
    categoryId: categoryId,
  });

  while (count > 0) {
    count -= 1;
    await createProduct(categoryId);
  }
};
