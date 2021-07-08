/** Export mutation object to avoid bloating schema file */
import { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from './category';

export default {
  createCategory: CREATE_CATEGORY,
  deleteCategory: DELETE_CATEGORY,
  updateCategory: UPDATE_CATEGORY,
};
