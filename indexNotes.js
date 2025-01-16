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

require('dotenv').config()

//use middleware for front project built in dist
app.use(express.static('dist'))


const Notes = require('./models/note')

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/api/notes', (request, response) => {
  Notes.find({}).then(notes => {
    response.json(notes)
  })
})
app.get('/api/notes/:id', (request, response, next) => {

  Notes.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error)

  )
})
app.delete('/api/notes/:id', (request, response, next) => {

  Notes.findByIdAndDelete(request.params.id)
    .then(
      response.status(204).end()
    )
    .catch(error => next(error))

})



app.post('/api/notes', (request, response, next) => {
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

  note.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body


  Notes.findByIdAndUpdate(request.params.id,

    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})