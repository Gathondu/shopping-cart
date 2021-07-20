/** Export mutation object to avoid bloating schema file */
import { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from './category';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from './product';

export default {
  createCategory: CREATE_CATEGORY,
  deleteCategory: DELETE_CATEGORY,
  updateCategory: UPDATE_CATEGORY,
  createProduct: CREATE_PRODUCT,
  deleteProduct: DELETE_PRODUCT,
  updateProduct: UPDATE_PRODUCT,
};
