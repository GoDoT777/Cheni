import { Pool } from 'pg';

const pool = new Pool({
<<<<<<< HEAD
  user: process.env.USER_DB,
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  database: 'postgres',
  password: 'SQgr9dgM2PwOCxn3',
  port: 5432,
=======
  user: process.env.NEXT_PUBLIC_USER_DB,
  host: process.env.NEXT_PUBLIC_HOST_DB,
  database: process.env.NEXT_PUBLIC_DATA_DB,
  password: process.env.NEXT_PUBLIC_PASS_DB,
  port: process.env.NEXT_PUBLIC_PORT_DB,
>>>>>>> 1f7223ddbea63b8050fb89925d760c26e3dc65e0
});

export default pool;
