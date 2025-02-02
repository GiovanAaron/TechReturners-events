import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || 'development';



// dotenv.config({
//   path: `${__dirname}/../../.env.${ENV}`,
// });


if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

const config: PoolConfig = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

export default new Pool(config);
