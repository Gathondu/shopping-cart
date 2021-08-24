import { gql, GraphQLClient } from 'graphql-request';
import { createConnection, getConnection, getManager } from 'typeorm';
import { Carts } from '../entities/carts';
import { CartItems } from '../entities/cart_items';
import { Categories } from '../entities/categories';
import { Products } from '../entities/products';
import { Users } from '../entities/users';
import { createCategory, createProduct, createUser } from './utils/factory';

describe('CART AND CART ITEMS INTERACTIONS', () => {
  let client: GraphQLClient;
  let user: Users | undefined;
  let cart: Carts | undefined;
  let product: Products | undefined;

  beforeAll(async () => {
    client = new GraphQLClient(`${process.env.URL}`);
    await createConnection();
    await createUser();
    user = await Users.findOne();
    cart = await Carts.findOne({ id: user?.cartId });
    await createCategory();
    const category = await Categories.findOne();
    await createProduct(category?.id);
    product = await Products.findOne({ categoryId: category?.id });
  });

  afterAll(() => {
    getConnection().close();
  });

  test('should have a cart associated with user', async () => {
    const query = gql`
      query cart($id: ID!) {
        cart(id: $id) {
          id
        }
      }
    `;
    const response = await client.request(query, { id: cart?.id });
    expect(response.cart).toEqual({
      id: `${cart?.id}`,
    });
  });

  test('should add to cart and the product stock reduces', async () => {
    const mutation = gql`
      mutation AddToCart($cartId: Int!, $productId: Int!, $count: Int!) {
        addItemToCart(cartId: $cartId, productId: $productId, count: $count) {
          id
        }
      }
    `;

    await client.request(mutation, {
      cartId: cart?.id,
      productId: product?.id,
      count: 3,
    });
    await product?.reload();
    const cartItems = await getManager().find(CartItems, {
      where: { cartId: cart?.id },
    });
    expect(cartItems).toHaveLength(1);
    // the factory creates all the products with a default of 20 items
    expect(product?.stockLevel).toEqual(17);
  });

  test('should remove from cart and the product stock increases', async () => {
    const mutation = gql`
      mutation RemoveFromCart($cartId: Int!, $productId: Int!, $count: Int!) {
        removeItemFromCart(
          cartId: $cartId
          productId: $productId
          count: $count
        ) {
          id
        }
      }
    `;

    await client.request(mutation, {
      cartId: cart?.id,
      productId: product?.id,
      count: 1,
    });
    await product?.reload();
    const cartItems = await getManager().find(CartItems, {
      where: { cartId: cart?.id },
    });
    expect(cartItems).toHaveLength(1);
    // the factory creates all the products with a default of 20 items
    expect(product?.stockLevel).toEqual(18);
  });

  // delete from cart and test that the product stock increases
  // delete cart deletes all the cart items and test that the products stock increases
  // deleting user deletes cart item and test that the product stock increases
});
