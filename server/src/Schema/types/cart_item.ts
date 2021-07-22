import { GraphQLObjectType, GraphQLID, GraphQLInt } from 'graphql';
import { Carts } from '../../entities/carts';
import { DateType } from '../scalars';
import { CartType } from './cart';

// Define the cart item type object
// define a cart item type for typescript
export type item = {
  id: number;
  productId: number;
  count: number;
  cart: Carts;
  createdAt: Date;
  updatedAt: Date;
};

export const ItemType = new GraphQLObjectType({
  name: 'Cart Item',
  description: 'A cart item',
  fields: () => ({
    id: { type: GraphQLID },
    productId: { type: GraphQLInt },
    count: { type: GraphQLInt },
    cart: { type: CartType },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
