/** Typeorm file to define and create the users
 * table in the database via migration files.
 */

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseCollection from './base_entity';
import { Carts } from './carts';

@Entity()
export class Users extends BaseCollection {
  @Column({ type: 'varchar', length: 20 })
  first_name!: string;

  @Column({ type: 'varchar', length: 20 })
  last_name!: string;

  @OneToOne(() => Carts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  cart!: Carts;
}
