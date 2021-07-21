/** Typeorm file to define and create the carts
 * table in the database via migration files.
 */

import { Column, Entity } from 'typeorm';
import BaseCollection from './base_entity';

@Entity()
export class Carts extends BaseCollection {
  @Column({ type: 'json' })
  products!: { item: number; product_id: number; count: number };
}
