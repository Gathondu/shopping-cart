import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { Users } from '../../entities/users';
import { DateType } from '../scalars';
import { UserType } from './user';

// Define the cart type object
// define a cart type for typescript
export type cart = {
  id: number;
  user: Users;
  products: string;
  created_at: Date;
  updated_at: Date;
};

export const CartType = new GraphQLObjectType({
  name: 'Cart',
  description: 'A cart',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: UserType },
    last_name: { type: GraphQLString },
    created_at: { type: DateType },
    updated_at: { type: DateType },
  }),
});
