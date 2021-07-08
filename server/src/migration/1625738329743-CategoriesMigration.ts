import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriesMigration1625738329743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS categories (
      id int NOT NULL AUTO_INCREMENT,
      created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      data_version int NOT NULL,
      name varchar(20) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY IDX_8b0be371d28245da6e4f4b6187 (name)
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
