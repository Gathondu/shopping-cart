import { gql, GraphQLClient } from 'graphql-request';
import { createConnection, getConnection } from 'typeorm';
import { Categories } from '../entities/categories';
import { Products } from '../entities/products';
import { createProduct } from './utils/factory';

describe('CATEGORY INTERACTIONS', () => {
  let client: GraphQLClient;
  const addCategoryMutation = gql`
    mutation AddCategory($name: String!) {
      createCategory(name: $name) {
        id
        name
      }
    }
  `;
  const allCategoriesQuery = gql`
    query {
      categories {
        id
        name
      }
    }
  `;

  beforeAll(async () => {
    client = new GraphQLClient(`${process.env.URL}`);
    await createConnection();
  });

  afterAll(() => {
    getConnection().close();
  });

  test('should create category', async () => {
    const variables = {
      name: 'clothingTest',
    };
    const response = await client.request(addCategoryMutation, variables);
    expect(response.createCategory).toEqual({ ...variables, id: '1' });
    const categories = await Categories.find();
    expect(categories).toHaveLength(1);
  });

  test('should update categories', async () => {
    const category = await Categories.findOne();
    const mutation = `
      mutation UpdateCategory($id: ID!, $name: String!) {
        updateCategory(id: $id, name: $name) {
          id
          name
        }
      }
    `;

    const variables = {
      id: category?.id,
      name: 'clothing',
    };
    await client.request(mutation, variables);
    const updatedCategory = await Categories.findOne(category?.id);
    expect(updatedCategory?.name).toEqual('clothing');
  });

  describe('should get', () => {
    test('all categories', async () => {
      await Promise.all(
        [
          { name: 'manufacturing' },
          { name: 'automobile' },
          { name: 'electronics' },
        ].map(
          async (category) =>
            await client.request(addCategoryMutation, category),
        ),
      );
      const response = await client.request(allCategoriesQuery);
      expect(response.categories).toHaveLength(4);
    });

    test('a category and its products', async () => {
      await createProduct(2);
      const category = await Categories.findOne(2, { relations: ['products'] });
      const query = `
        query category($id: ID!) {
          category(id: $id) {
            id
            name
            products {
              id
              name
            }
          }
        }
      `;
      const products = await Products.find({ categoryId: category?.id });
      const response = await client.request(query, { id: category?.id });
      expect(response.category).toEqual({
        id: `${category?.id}`,
        name: category?.name,
        products: category?.products.map((prod) => ({
          id: `${prod.id}`,
          name: prod.name,
        })),
      });
      expect(response.category.products).toHaveLength(products.length);
    });
  });

  test('should delete a category and the products associated with it', async () => {
    const mutation = `
      mutation deleteCategory($id: ID!) {
        deleteCategory(id: $id) {
          id
          name
        }
      }
    `;
    const category = await Categories.findOne(3);
    await createProduct(category?.id);
    const response = await client.request(mutation, { id: 3 });
    expect(response.deleteCategory).toEqual({
      id: `${category?.id}`,
      name: category?.name,
    });
    const allCategories = await client.request(allCategoriesQuery);
    const categoryProducts = await Products.find({ categoryId: category?.id });
    expect(allCategories.categories).toHaveLength(3);
    expect(categoryProducts).toHaveLength(0);
  });
});
