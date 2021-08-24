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
  cartId: number,
  productId: number,
  count?: number,
) => {
  const add = operation === 'add';
  const prod = await getManager().findOneOrFail(Products, productId);
  const cartItems = await getManager().find(CartItems, {
    where: { cartId: cartId },
  });
  const cartProd = cartItems.find((item) => item.productId === productId);
  if (!add && cartProd?.count === 1) {
    // never allow item count below 1. To remove the item entirely use DELETE_ITEM_FROM_CART
    return cartItems;
  }
  if (cartProd && count) {
    add ? (cartProd.count += count) : (cartProd.count -= count);
  } else if (cartProd) {
    add ? cartProd.count++ : cartProd.count--; // this is used from the shopping cart to adjust by 1
  } else {
    // ideally we should never get here if we are removing an item from cart
    const cartItem = new CartItems();
    cartItem.cartId = cartId;
    cartItem.productId = productId;
    cartItem.count = count ? count : 1; // set from products and can add many to cart
    await getManager().save(cartItem);
  }
  if (prod && count) {
    add ? (prod.stockLevel -= count) : (prod.stockLevel += count); // adjust the product stock level
  } else if (prod) {
    add ? prod.stockLevel-- : prod.stockLevel++;
  }
  await getManager().save(prod);
  if (cartProd) {
    await getManager().save(cartProd);
  }
  return cartItems;
};
export const ADD_TO_CART = {
  type: CartType,
  args: {
    cartId: { type: GraphQLInt },
    productId: { type: GraphQLInt },
    count: { type: GraphQLInt },
  },
  async resolve(
    parent: cart,
    { cartId, productId, count }: any,
  ): Promise<CartItems[] | undefined> {
    return await manageCart('add', cartId, productId, count);
  },
};

export const REMOVE_FROM_CART = {
  type: CartType,
  args: {
    cartId: { type: GraphQLInt },
    productId: { type: GraphQLInt },
    count: { type: GraphQLInt },
  },
  async resolve(
    parent: cart,
    { cartId, productId, count }: any,
  ): Promise<CartItems[] | undefined> {
    return await manageCart('remove', cartId, productId, count);
  },
};

export const DELETE_CART = {
  type: CartType,
  args: {
    cartId: { type: GraphQLInt },
  },
  async resolve(parent: cart, { cartId }: any): Promise<void> {
    await getManager().delete(Carts, cartId);
    const items = await getManager().find(CartItems, { where: { cartId } });
    items.map(async (item) => await getManager().delete(CartItems, item.id));
    return;
  },
};

export const DELETE_ITEM_FROM_CART = {
  type: CartType,
  args: {
    cartId: { type: GraphQLInt },
    productId: { type: GraphQLInt },
  },
  async resolve(parent: cart, { cartId, productId }: any): Promise<void> {
    const cartItem = await getManager().findOneOrFail(CartItems, {
      where: { cartId: cartId, productId: productId },
    });
    const prod = await getManager().findOneOrFail(Products, productId);
    cartItem && prod ? (prod.stockLevel += cartItem.count) : false;
    await getManager().save(prod);
    await getManager().delete(CartItems, cartItem.id);
    return;
  },
};
