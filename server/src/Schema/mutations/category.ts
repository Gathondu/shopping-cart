/** Create a mutation for the category type to allow us
 * to create update and delete a category
 */
// Vendor
import { GraphQLID, GraphQLString } from 'graphql';
import { getManager } from 'typeorm';

// Shopping Cart
import { Categories } from '../../entities/categories';
import { category, CategoryType } from '../types/category';

export const CREATE_CATEGORY = {
  type: CategoryType,
  args: {
    name: { type: GraphQLString },
  },
  async resolve(parent: category, { name }: any): Promise<Categories> {
    const cat = Categories.create({ name });
    return await getManager().save(cat);
  },
};

export const UPDATE_CATEGORY = {
  type: CategoryType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
  async resolve(
    parent: category,
    { id, name }: any,
  ): Promise<Categories | undefined> {
    await getManager().update(Categories, id, { name });
    return await getManager().findOneOrFail(Categories, id, {
      relations: ['products'],
    });
  },
};

export const DELETE_CATEGORY = {
  type: CategoryType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: category, { id }: any): Promise<Categories> {
    const category = await getManager().findOneOrFail(Categories, id);
    await getManager().delete(Categories, id);
    return category;
  },
};
