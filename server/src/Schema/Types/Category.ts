import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

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
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    created_at: { type: GraphQLInt },
    updated_at: { type: GraphQLInt },
  }),
});
