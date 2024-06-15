const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.headers.authorization
    console.log(authorization)
    if (authorization && authorization.startsWith('bearer ')) {
        const token = authorization.replace('bearer ', '')
        request.token = token
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.email) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.email)
    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    request.user = user
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}