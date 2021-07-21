import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { Categories } from '../../entities/categories';
import { DateType } from '../scalars';
import { CategoryType } from './category';

/** Define the product type object that we will consume in
 * graphQl queries and mutations.
 */

// define a product type for typescript
export type product = {
  id: number;
  name: string;
  sku: string;
  price: string;
  stock_level: number;
  expiry_date: Date;
  category: Categories;
  created_at: Date;
  updated_at: Date;
};

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'A product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLString },
    stock_level: { type: GraphQLInt },
    expiry_date: { type: DateType },
    category: { type: CategoryType },
    created_at: { type: DateType },
    updated_at: { type: DateType },
  }),
});
