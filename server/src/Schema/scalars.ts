import { GraphQLScalarType, Kind } from 'graphql';

//Create a date scalar type
// from apollo docs https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
export const DateType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize: (value) => value.getTime(),
  parseValue: (value) => new Date(value),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});
