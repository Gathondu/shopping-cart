/** Create a mutation for the product type to allow us
 * to create update and delete a product
 */
// Vendor
import { GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import { getManager } from 'typeorm';

// Shopping Cart
import { Products } from '../../entities/products';
import { product, ProductType } from '../types/product';
import { DateType } from '../scalars';

export const CREATE_PRODUCT = {
  type: ProductType,
  args: {
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLString },
    stock_level: { type: GraphQLInt },
    expiry_date: { type: DateType },
    category_id: { type: GraphQLInt },
  },
  async resolve(
    parent: product,
    { name, sku, price, stock_level, expiry_date, category_id }: any,
  ): Promise<Products> {
    const prod = new Products();
    prod.name = name;
    prod.sku = sku;
    prod.price = price;
    prod.stock_level = stock_level;
    prod.expiry_date = expiry_date;
    prod.category = <any>{ id: category_id };
    return await getManager().save(prod);
  },
};

export const UPDATE_PRODUCT = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLString },
    stock_level: { type: GraphQLInt },
    expiry_date: { type: DateType },
    category_id: { type: GraphQLInt },
  },
  async resolve(parent: product, args: any): Promise<Products | undefined> {
    const { id } = args;
    delete args.id;
    await getManager().update(Products, id, args);
    return await getManager().findOne(Products, id, {
      relations: ['category'],
    });
  },
};

export const DELETE_PRODUCT = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: product, { id }: any): Promise<void> {
    await getManager().delete(Products, id);
    return;
  },
};