const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // How long to try connecting before giving up
});

pool.on('connect', () => {
    console.log('Connected to database');
});

pool.on('remove', () => {
    console.log('Client removed from pool');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Export the pool instead of a single client
module.exports = pool;