/** Create a mutation for the category type to allow us
 * to create update and delete a category
 */
// Vendor
import { GraphQLString } from 'graphql';

// Shopping Cart
import { Categories } from '../../entities/categories';
import { category, CategoryType } from '../types/category';

export const CREATE_CATEGORY = {
  type: CategoryType,
  args: {
    name: { type: GraphQLString },
  },
  async resolve(parent: category, args: any): Promise<any> {
    const { name } = args;
    return await Categories.insert({ name });
  },
};
