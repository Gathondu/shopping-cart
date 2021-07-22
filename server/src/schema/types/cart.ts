import { GraphQLObjectType, GraphQLID } from 'graphql';
import { DateType } from '../scalars';

// Define the cart type object
// define a cart type for typescript
export type cart = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export const CartType = new GraphQLObjectType({
  name: 'Cart',
  description: 'A cart',
  fields: () => ({
    id: { type: GraphQLID },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
