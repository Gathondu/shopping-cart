/** Create a file that exports all the queries as an object as opposed to
 * bloating the schema file
 */

import { GET_ALL_CATEGORIES, GET_CATEGORY } from './category';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCTS_FROM_CATEGORY,
} from './product';

export default {
  getAllCategories: GET_ALL_CATEGORIES,
  getCategory: GET_CATEGORY,
  getAllProducts: GET_ALL_PRODUCTS,
  getProduct: GET_PRODUCT,
  getProductsFromCategory: GET_PRODUCTS_FROM_CATEGORY,
};
