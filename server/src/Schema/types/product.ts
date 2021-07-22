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
  stockLevel: number;
  expiryDate: Date;
  category: Categories;
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
    expiryDate: { type: DateType },
    category: { type: CategoryType },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
