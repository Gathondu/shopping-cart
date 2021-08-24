/** Typeorm file to define and create the carts
 * table in the database via migration files.
 */

import { Entity } from 'typeorm';
import BaseCollection from './base_entity';

@Entity()
export class Carts extends BaseCollection {}
