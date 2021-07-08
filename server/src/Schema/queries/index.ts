/** Create a file that exports all the queries as an object as opposed to
 * bloating the schema file
 */

import { GET_ALL_CATEGORIES, GET_CATEGORY } from './category';

export default {
  getAllCategories: GET_ALL_CATEGORIES,
  getCategory: GET_CATEGORY,
};
