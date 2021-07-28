import { GraphQLObjectType, GraphQLID, GraphQLInt } from 'graphql';
import { DateType } from '../scalars';

// Define the cart item type object
// define a cart item type for typescript
export type item = {
  id: number;
  productId: number;
  count: number;
  createdAt: Date;
  updatedAt: Date;
};

export const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'A cart item',
  fields: () => ({
    id: { type: GraphQLID },
    productId: { type: GraphQLInt },
    count: { type: GraphQLInt },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
