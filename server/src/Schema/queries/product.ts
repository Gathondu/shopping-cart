// Vendor
import { GraphQLID, GraphQLList } from 'graphql';
import { getManager } from 'typeorm';

// Shopping cart
import { product, ProductType } from '../types/product';
import { Products } from '../../entities/products';

// Define a query to return all products
export const GET_ALL_PRODUCTS = {
  type: new GraphQLList(ProductType),
  async resolve(): Promise<Products[]> {
    return await getManager().find(Products);
  },
};

export const GET_PRODUCT = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: product, args: any): Promise<Products | undefined> {
    const { id } = args;
    return await getManager().findOneOrFail(Products, id);
  },
};
