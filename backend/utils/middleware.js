// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
    let authorization = request.headers.authorization;
    console.log('Authorization:', authorization);
    if (authorization && authorization.startsWith('bearer ')) {
        const token = authorization.substring(7);
        console.log('Token:', token);
        request.token = token;
    } else {
        request.token = null;
    }
    next();
}

const userExtractor = async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'Token missing' });
    }

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if (!decodedToken.email) {
            return response.status(401).json({ error: 'Token invalid' });
        }
        const user = await User.findOne({ email: decodedToken.email });
        if (!user) {
            return response.status(401).json({ error: 'User not found' });
        }
        request.user = user;
        next();
    } catch (error) {
        return response.status(401).json({ error: 'Token expired or invalid' });
    }
}

module.exports = {
    tokenExtractor,
    userExtractor
};
