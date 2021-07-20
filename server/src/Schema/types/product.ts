import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
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
  price: number;
  stock_level: number;
  expiry_date: string;
  category_id: number;
  created_at: string;
  updated_at: string;
};

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'A product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLFloat },
    stock_level: { type: GraphQLInt },
    expiry_date: { type: DateType },
    category_id: { type: GraphQLInt },
    created_at: { type: DateType },
    updated_at: { type: DateType },
  }),
});
