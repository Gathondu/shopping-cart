/** Create a mutation for the user type to allow us
 * to create update and delete a user
 */
// Vendor
import { GraphQLID, GraphQLString } from 'graphql';
import { getManager } from 'typeorm';

// Shopping Cart
import { user, UserType } from '../types/user';
import { Users } from '../../entities/users';
import { Carts } from '../../entities/carts';
import { CartItems } from '../../entities/cart_items';

export const CREATE_USER = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
  async resolve(parent: user, { firstName, lastName }: any): Promise<Users> {
    const cart = getManager().create(Carts);
    await getManager().save(cart);
    const usr = new Users();
    usr.firstName = firstName;
    usr.lastName = lastName;
    usr.cart = cart;
    usr.cartId = cart.id;
    return await getManager().save(usr);
  },
};

export const UPDATE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
  async resolve(
    parent: user,
    { id, firstName, lastName }: any,
  ): Promise<Users> {
    await getManager().update(Users, id, { firstName, lastName });
    return await getManager().findOneOrFail(Users, id);
  },
};

export const DELETE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: user, { id }: any): Promise<void> {
    const user = await getManager().findOne(Users, id);
    const items = await getManager().find(CartItems, {
      where: { cartId: user?.cartId },
    });
    items.map(async (item) => await getManager().delete(CartItems, item.id));
    await getManager().delete(Users, id);
    return;
  },
};
