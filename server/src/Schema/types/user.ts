import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { DateType } from '../scalars';

// Define the user type object
// define a user type for typescript
export type user = {
  id: number;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    created_at: { type: DateType },
    updated_at: { type: DateType },
  }),
});
