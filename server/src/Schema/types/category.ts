import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { Products } from '../../entities/products';
import { DateType } from '../scalars';
import { ProductType } from './product';

/** Define the category type object that we will consume in
 * graphQl queries and mutations. The category describes what
 * type of product we have.
 */

// define a category type for typescript
export type category = {
  id: number;
  name: string;
  products: Products;
  createdAt: Date;
  updatedAt: Date;
};

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A category of products',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: { type: new GraphQLList(ProductType) },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
