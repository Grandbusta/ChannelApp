const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const app = express()
const db = require('./db/models')


async function testDbConnection() {
  try {
    await db.sequelize.authenticate()
    // db.sequelize.sync({alter: true})
    console.log('Database Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
testDbConnection()



// Import routes
const usersRouter = require('./routes/users')
const channelsRouter=require('./routes/channel')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE')
    return res.status(200).json({})
  }
  next()
})
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// app.use(cookieParser());

app.use('/',channelsRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({message: 'error'})
})

module.exports = app
