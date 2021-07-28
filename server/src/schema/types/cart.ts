import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import { DateType } from '../scalars';
import { ItemType } from './cart_item';

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
    items: { type: new GraphQLList(ItemType) },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
