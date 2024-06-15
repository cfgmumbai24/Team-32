const express = require('express')
const path = require('path');
const app = express()

const user = require('./models/user')

const cors = require('cors')
const checkRouter = require('./controllers/check')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const { tokenExtractor, userExtractor } = require('./utils/middleware')
const contentRouter = require('./controllers/content')
const courseRouter = require('./controllers/course')
const jobsRouter = require('./controllers/job')

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
app.use('/api', contentRouter)
app.use('/api', courseRouter)
app.use('/api', jobsRouter)

app.use(tokenExtractor)
app.use(userExtractor)

module.exports = app