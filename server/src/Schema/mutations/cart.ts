/** Create a mutation for the cart type to allow us
 * to update and delete a cart
 */
import { GraphQLID, GraphQLInt } from 'graphql';
import { getManager } from 'typeorm';
import { Carts } from '../../entities/carts';
import { CartItems } from '../../entities/cart_items';
import { Products } from '../../entities/products';
import { cart, CartType } from '../types/cart';

const manageCart = async (
  operation: string,
  id: number,
  productId: number,
  count?: number,
) => {
  const add = operation === 'add';
  const shoppingCart = await getManager().findOneOrFail(Carts, id);
  const prod = await getManager().findOneOrFail(Products, productId);
  const cartProd = shoppingCart.items.find((x) => x.productId === productId);
  if (!add && cartProd?.count == 1) {
    // never allow item count below 1. To remove the item entirely use DELETE_ITEM_FROM_CART
    return shoppingCart;
  }
  if (cartProd) {
    add ? cartProd.count++ : cartProd.count--; // this is used from the shopping cart to adjust by 1
  } else {
    // ideally we should never get here if we are removing an item from cart
    const cartItem = new CartItems();
    cartItem.cart = shoppingCart;
    cartItem.productId = productId;
    cartItem.count = count ? count : 1; // set from products and can add many to cart
    cartItem.save();
  }
  if (prod) {
    add ? prod.stockLevel-- : prod.stockLevel++; // adjust the product stock level
    getManager().save(prod);
  }
  await getManager().save(shoppingCart);
  return shoppingCart;
};
export const ADD_TO_CART = {
  type: CartType,
  args: {
    id: { type: GraphQLID },
    productId: { type: GraphQLID },
    count: { type: GraphQLInt },
  },
  async resolve(
    parent: cart,
    { id, productId, count }: any,
  ): Promise<Carts | undefined> {
    return manageCart('add', id, productId, count);
  },
};

export const REMOVE_FROM_CART = {
  type: CartType,
  args: {
    id: { type: GraphQLID },
    productId: { type: GraphQLID },
    count: { type: GraphQLInt },
  },
  async resolve(
    parent: cart,
    { id, productId, count }: any,
  ): Promise<Carts | undefined> {
    return manageCart('remove', id, productId, count);
  },
};

export const DELETE_CART = {
  type: CartType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: cart, { id }: any): Promise<void> {
    await getManager().delete(Carts, id);
    return;
  },
};

export const DELETE_ITEM_FROM_CART = {
  type: CartType,
  args: {
    id: { type: GraphQLID },
    productId: { type: GraphQLID },
  },
  async resolve(
    parent: cart,
    { id, productId }: any,
  ): Promise<Carts | undefined> {
    const shoppingCart = await getManager().findOneOrFail(Carts, id);
    const item = shoppingCart.items.find((x) => x.productId === productId);
    const prod = await getManager().findOneOrFail(Products, productId);
    item && prod ? prod.stockLevel + item.count : false;
    await getManager().delete(CartItems, item?.id);
    getManager().save(prod);
    return getManager().save(shoppingCart);
  },
};
