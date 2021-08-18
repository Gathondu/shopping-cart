/** Create a file that exports all the queries as an object as opposed to
 * bloating the schema file
 */

import { GET_ALL_CATEGORIES, GET_CATEGORY } from './category';
import { GET_ALL_PRODUCTS, GET_PRODUCT } from './product';
import { GET_USER_CART } from './cart';
import { GET_ALL_USERS, GET_USER } from './user';

export default {
  categories: GET_ALL_CATEGORIES,
  category: GET_CATEGORY,
  products: GET_ALL_PRODUCTS,
  product: GET_PRODUCT,
  cart: GET_USER_CART,
  users: GET_ALL_USERS,
  user: GET_USER,
};
