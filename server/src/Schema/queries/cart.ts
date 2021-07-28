// Vendor
import { GraphQLID } from 'graphql';
import { getManager } from 'typeorm';

// Shopping cart
import { cart, CartType } from '../types/cart';
import { Carts } from '../../entities/carts';

// Define a query to return user cart
export const GET_USER_CART = {
  type: CartType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: cart, { id }: any): Promise<Carts> {
    return await getManager().findOneOrFail(Carts, id, {
      relations: ['items'],
    });
  },
};
