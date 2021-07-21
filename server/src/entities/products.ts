/** Typeorm file to define and create the products
 * table in the database via migration files.
 */

import { Column, Entity, ManyToOne } from 'typeorm';
import BaseCollection from './base_entity';
import { Categories } from './categories';

@Entity()
export class Products extends BaseCollection {
  @Column({ type: 'varchar', unique: true, length: 50 })
  name!: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  sku!: string;

  @Column({ type: 'float' })
  price!: number;

  @Column()
  stock_level!: number;

  @Column({
    nullable: true,
  })
  expiry_date!: Date;

  @ManyToOne(() => Categories, (category) => category.products, {
    nullable: false,
    cascade: true,
  })
  category!: Categories;
}
