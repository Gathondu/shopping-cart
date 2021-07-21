import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCartEntity1626880761876 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS carts (
      id int NOT NULL AUTO_INCREMENT,
      created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      data_version int NOT NULL,
      products json NOT NULL,
      PRIMARY KEY (id)
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('carts');
  }
}
