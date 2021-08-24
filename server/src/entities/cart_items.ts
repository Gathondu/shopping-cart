/** Typeorm file to define and create the cart items
 * table in the database via migration files.
 */

import { Column, Entity } from 'typeorm';
import BaseCollection from './base_entity';

@Entity()
export class CartItems extends BaseCollection {
  @Column({ name: 'product_id' })
  productId!: number;

  @Column()
  count!: number;

  @Column({ name: 'cart_id' })
  cartId!: number;
}
