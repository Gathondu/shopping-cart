// Vendor
import { GraphQLID, GraphQLList } from 'graphql';

// Shopping cart
import { category, CategoryType } from '../types/category';
import { Categories } from '../../entities/categories';

// Define a query to return all available categories
export const GET_ALL_CATEGORIES = {
  type: new GraphQLList(CategoryType),
  async resolve(): Promise<Categories[]> {
    return await Categories.find();
  },
};

export const GET_CATEGORY = {
  type: CategoryType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: category, args: any): Promise<Categories> {
    const { id } = args;
    return await Categories.findOneOrFail({ id });
  },
};
