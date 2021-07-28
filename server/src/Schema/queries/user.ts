// Vendor
import { GraphQLID, GraphQLList } from 'graphql';
import { getManager } from 'typeorm';

// Shopping cart
import { user, UserType } from '../types/user';
import { Users } from '../../entities/users';

// Define a query to return all users
export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve(): Promise<Users[]> {
    return await getManager().find(Users);
  },
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: user, { id }: any): Promise<Users | undefined> {
    return await getManager().findOneOrFail(Users, id, {
      relations: ['cart'],
    });
  },
};
