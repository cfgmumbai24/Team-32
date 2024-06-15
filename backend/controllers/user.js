const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const pool = require('../models/pgsql_connect');

userRouter.get('/getAllUsers', async (request, response) => {
    const client = await pool.connect(); // Acquire a client from the pool
    console.log('connected');

    try {
        const users = await client.query('SELECT * FROM _user');
        console.log(users.rows);
        if (users.rows.length > 0) {
            response.json(users.rows); // Sending the data as JSON
        } else {
            response.status(200).json([]); // Send an empty array if no users found
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

userRouter.post('/insertUser', async (request, response) => {
    const client = await pool.connect(); // Acquire a client from the pool
    try {
        const { email, name, password, role, keywords } = request.body;
        console.log(email, name, password, role, keywords);
        console.log('hello');
        if (!email || !password || !name || !role || !Array.isArray(keywords)) {
            return response.status(400).json({ error: 'All fields are required and keywords must be an array' });
        }

        if (email.length < 3 || password.length < 3 || name.length < 3) {
            return response.status(400).json({ error: 'email, name, and password must be at least 3 characters long' });
        }

        const validRoles = [1, 2, 3, 4, 5];
        if (!validRoles.includes(role)) {
            return response.status(400).json({ error: 'Role must be one of 1, 2, 3, 4, or 5' });
        }

        const existingUserQuery = 'SELECT * FROM _user WHERE email = $1';
        const result = await client.query(existingUserQuery, [email]);
        if (result.rows.length > 0) {
            return response.status(409).json({ error: 'Email must be unique' });
        }

        const saltRounds = 10;
        let passwordHash;
        try {
            passwordHash = await bcrypt.hash(password, saltRounds);
        } catch (hashError) {
            console.error('Error hashing password:', hashError);
            return response.status(500).json({ error: 'Error processing password' });
        }

        const insertUserQuery = 'INSERT INTO _user (email, name, password, role, keywords) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const newUsers = await client.query(insertUserQuery, [email, name, passwordHash, role, keywords]);
        const savedUser = newUsers.rows[0];
        response.status(201).json(savedUser);
    } catch (dbError) {
        console.error('Database error:', dbError);
        response.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

userRouter.get('/getUser/:email', async (request, response) => {
    const client = await pool.connect(); // Acquire a client from the pool
    try {
        const { email } = request.params;
        const userQuery = 'SELECT * FROM _user WHERE email = $1';
        const result = await client.query(userQuery, [email]);

        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        response.status(200).json(user);
    } catch (error) {
        console.error('Database error:', error);
        response.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

module.exports = userRouter;