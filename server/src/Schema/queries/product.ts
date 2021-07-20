// Vendor
import { GraphQLID, GraphQLList } from 'graphql';

// Shopping cart
import { product, ProductType } from '../types/product';
import { Products } from '../../entities/products';
import { Categories } from '../../entities/categories';

// Define a query to return all products
export const GET_ALL_PRODUCTS = {
  type: new GraphQLList(ProductType),
  async resolve(): Promise<Products[]> {
    return await Products.find();
  },
};

export const GET_PRODUCT = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: product, args: any): Promise<Products> {
    const { id } = args;
    return await Products.findOneOrFail({ id });
  },
};

export const GET_PRODUCTS_FROM_CATEGORY = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: product, args: any): Promise<Products[]> {
    const { id } = args;
    const cat = await Categories.findOneOrFail({ id });
    return cat.products;
  },
};
