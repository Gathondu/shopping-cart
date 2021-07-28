import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { DateType } from '../scalars';

// Define the user type object
// define a user type for typescript
export type user = {
  id: number;
  firstName: string;
  lastName: string;
  cartId: number;
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
    cartId: { type: GraphQLInt },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
