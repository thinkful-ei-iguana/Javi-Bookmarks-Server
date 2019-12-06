const express = require('express');
const uuid = require('uuid/v4');
const bookmarkRouter = express.Router()

const { bookmarks } = require('../store')
const logger = require('./logger')

//////////////////GET BOOKMARKS///////////////////////
bookmarkRouter.get('/', (req,res) => {
    res.json(bookmarks)
  })
  
  bookmarkRouter.get('/:id',(req,res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(bm => bm.id == id)
    
    if(!bookmark){
      logger.error(`Bookmark with id ${id} not found`)
      return res.status(404).send('Bookmark Not Found')
    }
  
    res.json(bookmark)
  })
  
  /////////////////POST BOOKMARKS////////////////////
  bookmarkRouter.post('/',(req,res) => {
    const { title, url, description, rating } = req.body;
    const id = uuid();
  
    const bookmark = { id, title, url, description, rating }
    bookmarks.push(bookmark)
  
    logger.info(`Bookmark with id ${id}  created`)
  
  
    res.status(201).location(`http://localhost:8000/bookmarks/${id}`).json(bookmark)
  })
  
  ///////////////DELETE BOOKMARKS////////////////////
  bookmarkRouter.delete('/:id',(req, res) => {
    const { id } = req.params;
    const bookmarksIndex = bookmarks.findIndex(bm => bm.id == id)
  
    if(bookmarksIndex === -1){
      logger.error(`Bookmarks with id ${id} not found`)
      return res.status(404).send('not found')
    }
    bookmarks.splice(bookmarksIndex,1)
    logger.info(`bookmarks with id ${id} deleted`)
    res.status(204).end()
  })

  module.exports = bookmarkRouter