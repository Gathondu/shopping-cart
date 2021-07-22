import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { DateType } from '../scalars';

/** Define the category type object that we will consume in
 * graphQl queries and mutations. The category describes what
 * type of product we have.
 */

// define a category type for typescript
export type category = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A category of products',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
  }),
});
