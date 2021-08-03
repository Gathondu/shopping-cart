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
  dropSchema: NODE_ENV === 'test' ? true : false,
  logging: NODE_ENV === 'development' ? true : false,
  synchronize: NODE_ENV === 'production' ? false : true,
  entities: [`${dir}/entities/*{.ts,.js}`],
  migrations: [`${dir}/migration/*{.ts,.js}`],
  cli: {
    migrationsDir: `${dir}/migration`,
  },
};

export default config;
