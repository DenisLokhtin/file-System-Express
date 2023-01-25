import pkg from 'pg';
const {Pool} = pkg;
import * as dotenv from 'dotenv';
dotenv.config();

// psql -U postgres < seed.sql

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
});
export default pool;