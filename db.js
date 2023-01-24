const {Pool} = require("pg");

// psql -U postgres < seed.sql

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'file_system_test'
});
module.exports = pool;