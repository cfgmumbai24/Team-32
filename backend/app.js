const express = require('express')
const path = require('path');
const app = express()

const user = require('./models/user')

const cors = require('cors')
const checkRouter = require('./controllers/check')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

user

require('express-async-errors')

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json())
app.use(express.static('build'))

app.use(cors())

app.use('/api', checkRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)

module.exports = app