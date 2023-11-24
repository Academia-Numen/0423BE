const express = require('express') // LLAMANDO EXPRESS - import express from express
const logger = require('morgan')
const cors = require('cors')
const cookie = require('cookie-parser')
const session = require('express-session')

require('dotenv').config()

const app = express() // express se asigna a una variable 

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(cookie())
app.use(session({
    secret: process.env.SESSION,
    resave: true,
    saveUninitialized: true
}))

const indexRouter = require('./router/index')
const apiRouter = require('./router/api')
const userRouter = require('./router/user')

const {connect} = require('./db/connect')

app.use('/index', indexRouter)
app.use('/api', apiRouter)
app.use('/user', userRouter)

connect()

module.exports = app



