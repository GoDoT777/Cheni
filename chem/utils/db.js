import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.USER_DB,
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  database: 'postgres',
  password: 'SQgr9dgM2PwOCxn3',
  port: 5432,
});

export default pool;
