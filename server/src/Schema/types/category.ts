import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

/** Define the category type object that we will consume in
 * graphQl queries and mutations. The category describes what
 * type of product we have.
 */

// define a category type for typescript
export type category = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A category of products',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
