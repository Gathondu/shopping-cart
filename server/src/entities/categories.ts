/** Typeorm file to define and create the categories
 * table in the database via migration files.
 */

import { Column, Entity, OneToMany } from 'typeorm';
import BaseCollection from './base_entity';
import { Products } from './products';

@Entity()
export class Categories extends BaseCollection {
  @Column({ type: 'varchar', unique: true, length: 20 })
  name!: string;

  @OneToMany(() => Products, (products) => products.category)
  products!: Products[];
}
