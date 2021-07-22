/** Typeorm file to define and create the cart items
 * table in the database via migration files.
 */

import { Column, Entity, ManyToOne } from 'typeorm';
import BaseCollection from './base_entity';
import { Carts } from './carts';

@Entity()
export class CartItems extends BaseCollection {
  @Column({ name: 'product_id' })
  productId!: number;

  @Column()
  count!: number;

  @ManyToOne(() => Carts, (cart) => cart.items, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart!: Carts;
}
