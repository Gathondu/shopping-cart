/* eslint-disable no-console */
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const main = async () => {
  await createConnection({
    type: 'mysql',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    synchronize: false,
    entities: [],
  });
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.listen(port, () => {
    console.log(`running on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
