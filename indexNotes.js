const express = require('express')
const app = express()
app.use(express.json())

var morgan = require('morgan')
morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const cors = require('cors')
app.use(cors())

require("dotenv").config();

//use middleware for front project built in dist
app.use(express.static('dist'))


let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// const mongoose = require('mongoose')

// const password = process.argv[2];
// const collection = 'noteApp';

// const url = process.env.MONGODB_URI_NOTES;
//     //`mongodb+srv://teissieralexia:${password}@fullstackcourseatb.xezle.mongodb.net/${collection}?retryWrites=true&w=majority&appName=fullstackcourseATB`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

const Notes = require('./models/note')

app.get('/', (request, response) => {
response.send('<h1>Hello World!</h1>')
})
app.get('/api/notes', (request, response) => {
  //response.json(Notes)
  Notes.find({}).then(notes => {
    response.json(notes)
  })
})
app.get('/api/notes/:id', (request, response) => {
//   const id = request.params.id
//   const note = notes.find(note => note.id === id)
//   if (note) {
//       response.json(note)
//     } else {
//       response.status(404).end()
//     }
    Notes.findById(request.params.id).then(note => {
        response.json(note)
    })
})
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

// const generateIdNotes = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Notes({
    content: body.content,
    important: Boolean(body.important) || false,
  })
//   const note = {
//     content: body.content,
//     important: Boolean(body.important) || false,
//     id: generateIdNotes(),
//   }

//   notes = notes.concat(note)

//   response.json(note)
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})