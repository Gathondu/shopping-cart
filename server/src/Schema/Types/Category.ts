import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

/** Define the category type object that we will consume in
 * graphQl queries and mutations. The category describes what
 * type of product we have.
 */
const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

export default CategoryType;
