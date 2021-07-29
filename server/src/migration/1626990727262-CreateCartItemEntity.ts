import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartItemEntity1626990727262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`CREATE TABLE IF NOT EXISTS cart_items (
  id int NOT NULL AUTO_INCREMENT,
  created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  data_version int NOT NULL,
  product_id int NOT NULL,
  count int NOT NULL,
  cartId int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_edd714311619a5ad09525045838 FOREIGN KEY (cartId) REFERENCES carts (id) ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('cart_items');
  }
}
