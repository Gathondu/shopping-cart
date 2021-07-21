import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductsTable1625778773479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS products (
        id int NOT NULL AUTO_INCREMENT,
        data_version int NOT NULL,
        name varchar(50) NOT NULL,
        sku varchar(100) NOT NULL,
        price float NOT NULL,
        stock_level int NOT NULL,
        categoryId int NOT NULL,
        expiry_date datetime(6) NULL DEFAULT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        UNIQUE KEY IDX_4c9fb58de893725258746385e1 (name),
        UNIQUE KEY IDX_c44ac33a05b144dd0d9ddcf932 (sku),
        CONSTRAINT FK_ff56834e735fa78a15d0cf21926 FOREIGN KEY (categoryId) REFERENCES categories (id)
        ON DELETE CASCADE ON UPDATE CASCADE
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
