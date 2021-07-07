/** Create a mutation for the category type to allow us
 * to create update and delete a category
 */
// Vendor
import { GraphQLString } from "graphql";

// Shopping Cart
import CategoryType from "../types/category";

type category = {
  name: string
}

export const CREATE_CATEGORY = {
  type: CategoryType,
  args: {
    name: { type: GraphQLString },
  },
  resolve(parent: category, args: any): string {
    const { name } = args
    return name
  }
}
