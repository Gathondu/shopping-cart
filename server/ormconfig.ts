import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  NODE_ENV,
} = process.env;

const dir = NODE_ENV === 'production' ? 'dist' : 'src';

const config: ConnectionOptions = {
  type: 'mysql',
  database: DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  logging: NODE_ENV === 'production' ? false : true,
  synchronize: NODE_ENV === 'production' ? false : true,
  entities: [`${dir}/entities/*.ts`],
  migrations: [`${dir}/migration/*.ts`],
  cli: {
    migrationsDir: `${dir}/migration`,
  },
};

export default config;
