/** Create a file that exports all the queries as an object as opposed to
 * bloating the schema file
 */

import {
  GET_ALL_CATEGORIES,
  GET_CATEGORY,
  GET_CATEGORY_PRODUCTS,
} from './category';
import { GET_ALL_PRODUCTS, GET_PRODUCT } from './product';
import { GET_USER_CART } from './cart';

export default {
  getAllCategories: GET_ALL_CATEGORIES,
  getCategory: GET_CATEGORY,
  getCategoryProducts: GET_CATEGORY_PRODUCTS,
  getAllProducts: GET_ALL_PRODUCTS,
  getProduct: GET_PRODUCT,
  getCart: GET_USER_CART,
};
