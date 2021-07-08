import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export default abstract class BaseCollection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createDate!: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updateDate!: string;

  @VersionColumn({ name: 'data_version' })
  dataVersion!: number;
}
