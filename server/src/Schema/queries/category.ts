// Vendor
import { GraphQLList } from "graphql";

// Shopping cart
import CategoryType from "../types/category";

// Define a query to return all available categories
export const GET_ALL_CATEGORIES = {
  type: new GraphQLList(CategoryType),
  resolve():  string[] {
    return []
  }
}
