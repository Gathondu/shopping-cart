/** Typeorm file to define and create the users
 * table in the database via migration files.
 */

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseCollection from './base_entity';
import { Carts } from './carts';

@Entity()
export class Users extends BaseCollection {
  @Column({ type: 'varchar', length: 20, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'varchar', length: 20, name: 'last_name' })
  lastName!: string;

  @Column('int')
  cartId!: number;

  @OneToOne(() => Carts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'cart' })
  cart!: Carts;
}
