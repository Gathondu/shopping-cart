import * as dotenv from 'dotenv';
import path from 'path';

// Initialize dotenv that helps with setting env variables
dotenv.config({
  path: path.resolve(process.cwd(), '.env.test'),
});
