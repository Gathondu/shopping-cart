// Vendor
import { GraphQLID, GraphQLList } from 'graphql';
import { getManager } from 'typeorm';

// Shopping cart
import { category, CategoryType } from '../types/category';
import { Categories } from '../../entities/categories';

// Define a query to return all available categories
export const GET_ALL_CATEGORIES = {
  type: new GraphQLList(CategoryType),
  async resolve(): Promise<Categories[]> {
    return await getManager().find(Categories);
  },
};

export const GET_CATEGORY = {
  type: CategoryType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: category, { id }: any): Promise<Categories> {
    return await getManager().findOneOrFail(Categories, id, {
      relations: ['products'],
    });
  },
};
