/** Create and define our schema that graphQl will use
 * when we hool it up to our application.
 */

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {},
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {},
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
