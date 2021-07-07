/** Create and define our schema that graphQl will use
 * when we hool it up to our application.
 */

// Vendor
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Shopping Cart
import queries from './queries';
import mutations from "./mutations";

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: queries,
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: mutations,
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
