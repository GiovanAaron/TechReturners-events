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
  user?: string;
  host?: string;
  database?: string;
  password?: string;
  port?: number;
  ssl?: boolean | { rejectUnauthorized: boolean; };
}
const config: Config = {};

if (ENV === 'production') {
  config.connectionString = process.env.PGDATABASE;
  config.max = 2,
  config.user = process.env.DB_USER || 'postgres', // Supabase database user
  config.host = process.env.DB_HOST || 'db.yourproject.supabase.co', // Supabase host
  config.database= process.env.DB_NAME || 'postgres', // Supabase database name
  config.password = process.env.DB_PASSWORD, // Supabase database password
  config.port = parseInt(process.env.DB_PORT || '5432'), // Supabase port
  config.ssl = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false 
}

export default new Pool(config);
