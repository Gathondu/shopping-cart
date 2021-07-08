/** Create a mutation for the category type to allow us
 * to create update and delete a category
 */
// Vendor
import { GraphQLString } from 'graphql';

// Shopping Cart
import { Categories } from '../../entities/categories';
import { CategoryType, category } from '../types/category';

export const CREATE_CATEGORY = {
  type: CategoryType,
  args: {
    name: { type: GraphQLString },
  },
  async resolve(parent: category, args: any): Promise<string> {
    await Categories.insert(args);
    return `Successfully created category ${args.name}`;
  },
};
