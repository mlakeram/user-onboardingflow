import pg from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line no-undef
const environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
  dotenv.config({ path: path.resolve(__dirname, '../../.env.development') });
}

// eslint-disable-next-line no-undef
const DATABASE_URL = process.env.DATABASE_URL;

console.log(DATABASE_URL);

const { Pool } = pg;

export const pool = new Pool({
  connectionString: DATABASE_URL,
});
