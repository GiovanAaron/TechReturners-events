import { Pool} from 'pg';
import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || 'development';



dotenv.config({
  path: `${__dirname}/../../.env.${ENV}`,
});


if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

interface Config {
  connectionString?: string;
  max?: number;
}
const config: Config = {};

if (ENV === 'development') {
  config.connectionString = process.env.PGDATABASE;
  config.max = 2;
}

export default new Pool(config);
