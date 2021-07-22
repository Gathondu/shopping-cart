import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { Carts } from '../../entities/carts';
import { DateType } from '../scalars';
import { CartType } from './cart';

// Define the user type object
// define a user type for typescript
export type user = {
  id: number;
  firstName: string;
  lastName: string;
  cart: Carts;
  createdAt: Date;
  updatedAt: Date;
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    Carts: { type: CartType },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
