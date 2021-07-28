import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { DateType } from '../scalars';

/** Define the product type object that we will consume in
 * graphQl queries and mutations.
 */

// define a product type for typescript
export type product = {
  id: number;
  name: string;
  sku: string;
  price: string;
  stockLevel: number;
  categoryId: number;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'A product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLString },
    stockLevel: { type: GraphQLInt },
    categoryId: { type: GraphQLInt },
    expiryDate: { type: DateType },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
