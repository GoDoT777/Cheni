import { Pool } from "pg";

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER_DB,
  host: process.env.NEXT_PUBLIC_HOST_DB,
  database: process.env.NEXT_PUBLIC_DATA_DB,
  password: process.env.NEXT_PUBLIC_PASS_DB,
  port: process.env.NEXT_PUBLIC_PORT_DB,
});

export default pool;
