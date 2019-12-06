require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const winston = require('winston')
const uuid = require('uuid/v4')
const { NODE_ENV } = require('./config')

const app = express()
const store = require('../store')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json())

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: 'info.log'})
  ]
})

app.get('/', (req,res) => {
    res.send('Hello, world!')
})

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')


  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`)
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})
//////////////////GET BOOKMARKS///////////////////////
app.get('/bookmarks', (req,res) => {
  res.json(store.bookmarks)
})

app.get('/bookmarks/:id',(req,res) => {
  const { id } = req.params;
  const bookmark = store.bookmarks.find(bm => bm.id == id)
  console.log(bookmark)
  if(!bookmark){
    logger.error(`Bookmark with id ${id} not found`)
    return res.status(400).send('Bookmark Not Found')
  }

  res.json(bookmark)
})

app.use(function errorHandler(error, req, res, next) {
       let response
       if (NODE_ENV === 'production'){
         response = { error: { message: 'server error' } }
       } else {
         console.error(error)
         response = { message: error.message, error }
       }
       res.status(500).json(response)
     })

module.exports = app