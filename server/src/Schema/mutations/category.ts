/** Create a mutation for the category type to allow us
 * to create update and delete a category
 */
// Vendor
import { GraphQLID, GraphQLString } from 'graphql';
import { resolve } from 'path/posix';

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

export const UPDATE_CATEGORY = {
  type: CategoryType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
  async resolve(parent: category, args: any): Promise<Categories> {
    const { id, name } = args;
    const cat = await Categories.findOneOrFail({ id });
    cat.name = name;
    cat.save();
    return cat;
  },
};
