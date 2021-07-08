/* eslint-disable no-console */
/** VENDOR IMPORTS */
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import dotenv from 'dotenv';

/** SHOPPING CART IMPORTS */
import schema from './schema';

// Initialize dotenv that helps with setting env variables
dotenv.config();

const port = process.env.PORT;

const main = async () => {
  // Create the database connection via the typeorm orm
  await createConnection();

  const app = express(); // Initialize our express server

  // MIDDLEWARES
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );

  // Start the express server
  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
