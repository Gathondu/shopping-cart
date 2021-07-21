import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEntity1626880774874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL AUTO_INCREMENT,
  created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  data_version int NOT NULL,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  cartId int DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_89502c44bd22c06e714c31c1e93 FOREIGN KEY (cartId) REFERENCES carts (id) ON DELETE CASCADE ON UPDATE CASCADE
)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
