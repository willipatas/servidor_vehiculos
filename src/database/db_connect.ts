import {Pool} from "pg";
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_DEV_HOST,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    port: parseInt(`${process.env.DB_DEV_PORT}`),
    idleTimeoutMillis: 3000,
});

export default pool;