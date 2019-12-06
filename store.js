const uuid = require('uuid/v4')

const bookmarks = [
  { id: '0abab856-f8f3-4378-ad21-826763ca0a84',
    title: 'Thinkful',
    url: 'https://www.thinkful.com',
    description: 'Think outside the classroom',
    rating: 5 },
  { id: "6457bf6b-05af-4f52-9855-ae7733b539db",
    title: 'Google',
    url: 'https://www.google.com',
    description: 'Where we find everything else',
    rating: 4 },
  { id: uuid(),
    title: 'MDN',
    url: 'https://developer.mozilla.org',
    description: 'The only place to find web documentation',
    rating: 5 },
]

module.exports = { bookmarks }