/** Export mutation object to avoid bloating schema file */
import { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from './category';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from './product';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_CART,
  DELETE_ITEM_FROM_CART,
} from './cart';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from './user';

const createMutations = {
  createCategory: CREATE_CATEGORY,
  createProduct: CREATE_PRODUCT,
  createUser: CREATE_USER,
};

const updateMutations = {
  updateCategory: UPDATE_CATEGORY,
  updateProduct: UPDATE_PRODUCT,
  updateUser: UPDATE_USER,
  addItemToCart: ADD_TO_CART,
  removeItemFromCart: REMOVE_FROM_CART,
};

const deleteMutations = {
  deleteCategory: DELETE_CATEGORY,
  deleteProduct: DELETE_PRODUCT,
  deleteCart: DELETE_CART,
  deleteItemFromCart: DELETE_ITEM_FROM_CART,
  deleteUser: DELETE_USER,
};

export default {
  ...createMutations,
  ...updateMutations,
  ...deleteMutations,
};
