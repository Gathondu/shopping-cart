import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export default abstract class BaseCollection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}
