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

export const CREATE_USER = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
  async resolve(parent: user, { firstName, lastName }: any): Promise<Users> {
    const usr = new Users();
    usr.firstName = firstName;
    usr.lastName = lastName;
    usr.cart = new Carts();
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
  async resolve(parent: user, args: any): Promise<Users> {
    const { id, firstName, lastName } = args;
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
    await getManager().delete(Users, id);
    return;
  },
};
