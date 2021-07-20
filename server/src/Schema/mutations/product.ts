/** Create a mutation for the product type to allow us
 * to create update and delete a product
 */
// Vendor
import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import { Categories } from '../../entities/categories';

// Shopping Cart
import { Products } from '../../entities/products';
import { product, ProductType } from '../types/product';

export const CREATE_PRODUCT = {
  type: ProductType,
  args: {
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLFloat },
    stock_level: { type: GraphQLInt },
    expiry_date: { type: GraphQLString },
    category_id: { type: GraphQLInt },
  },
  async resolve(parent: product, args: any): Promise<Products> {
    const { name, sku, price, stock_level, expiry_date, category_id } = args;
    const prod = Products.create({
      name,
      sku,
      price,
      stock_level,
      expiry_date,
    });
    prod.category = await Categories.findOneOrFail({ id: category_id });
    await prod.save();
    return prod;
  },
};

export const UPDATE_PRODUCT = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLInt },
    stock_level: { type: GraphQLInt },
    expiry_date: { type: GraphQLString },
    category_id: { type: GraphQLInt },
  },
  async resolve(parent: product, args: any): Promise<Products> {
    const { id, name, sku, price, stock_level, expiry_date, category_id } =
      args;
    const prod = await Products.findOneOrFail({ id });
    const cat = await Categories.findOne({ id: category_id });
    prod.name = name;
    prod.sku = sku;
    prod.price = price;
    prod.stock_level = stock_level;
    prod.expiry_date = expiry_date;
    prod.save();
    cat?.products.push(prod);
    return prod;
  },
};

export const DELETE_PRODUCT = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: product, args: any): Promise<string> {
    const { id } = args;
    const prod = await Products.findOneOrFail({ id });
    prod.remove();
    return 'record deleted';
  },
};
