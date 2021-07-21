// Vendor
import { GraphQLID, GraphQLList } from 'graphql';
import { getManager } from 'typeorm';

// Shopping cart
import { category, CategoryType } from '../types/category';
import { Categories } from '../../entities/categories';
import { product, ProductType } from '../types/product';
import { Products } from '../../entities/products';

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
    return await getManager().findOneOrFail(Categories, id);
  },
};

export const GET_CATEGORY_PRODUCTS = {
  type: new GraphQLList(ProductType),
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: product, { id }: any): Promise<Products[]> {
    const cat = await getManager().findOneOrFail(Categories, id);
    return await getManager().find(Products, {
      where: { category: cat },
    });
  },
};
