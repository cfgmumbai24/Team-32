const pool = require('./pgsql_connect');

(async () => {
    const client = await pool.connect(); // Acquire a client from the pool
    try {
        const tableQuery = `
            CREATE TABLE IF NOT EXISTS _user (
                email VARCHAR(100) PRIMARY KEY,
                password TEXT NOT NULL,
                name VARCHAR(100) NOT NULL,
                role INT NOT NULL,
                keywords TEXT[]
            );
        `;

        const result = await client.query(tableQuery);
        console.log('User table created successfully' + result);
    } catch (err) {
        console.error(err);
    } finally {
        client.release(); // Release the client back to the pool
    }
})();