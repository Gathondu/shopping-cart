/** Typeorm file to define and create the carts
 * table in the database via migration files.
 */

import { Entity, OneToMany } from 'typeorm';
import BaseCollection from './base_entity';
import { CartItems } from './cart_items';

@Entity()
export class Carts extends BaseCollection {
  @OneToMany(() => CartItems, (item) => item.cart)
  items!: CartItems[];
}
