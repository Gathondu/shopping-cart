/* eslint-disable no-console */
/** VENDOR IMPORTS */
import 'reflect-metadata';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

/** SHOPPING CART IMPORTS */
import schema from './schema';

// Initialize dotenv that helps with setting env variables
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const port = process.env.PORT;

// Create the database connection via the typeorm orm
// configurations are in the ormconfig
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
createConnection().then(() =>
  app.listen(port, () => {
    console.log(`running on port ${port}`);
  }),
);

export default app;
