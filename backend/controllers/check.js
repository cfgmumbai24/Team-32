const checkRouter = require('express').Router()

checkRouter.get('/info', async (request, response) => {
    response.json('This is the info page')
})

module.exports = checkRouter