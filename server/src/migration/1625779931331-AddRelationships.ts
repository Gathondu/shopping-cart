import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationships1625779931331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE products ADD categoryId int NULL`);
    queryRunner.query(`ALTER TABLE products
        ADD CONSTRAINT FK_ff56834e735fa78a15d0cf21926
        FOREIGN KEY (categoryId)
        REFERENCES categories(id)
        ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE products DROP FOREIGN KEY FK_ff56834e735fa78a15d0cf21926`,
    );
    queryRunner.query(`ALTER TABLE products DROP COLUMN categoryId`);
  }
}
