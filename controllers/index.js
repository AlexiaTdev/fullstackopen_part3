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

const config = require('./utils/config')
const logger = require('./utils/logger')

const Persons = require('../models/person')

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
  let date = new Date()
  response.send('<p>Phonebook has info for '+Persons.length+' people</p><p>'+date+'</p>')
})
app.get('/api/persons', (request, response) => {
  Persons.find({}).then(person => {
    response.json(person)
  })
})
app.get('/api/persons/:id', (request, response, next) => {

  Persons.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Persons.findByIdAndDelete(request.params.id)
    .then(
      response.status(204).end()
    )
    .catch(error => next(error))
})

app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  const personDoesExist = await Persons.findOne({ name:body.name })

  if (personDoesExist){
    return response.status(400).send({
      error: 'person already exists'
    })
  }

  const person = new Persons({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = new Persons({
    name: request.body.name,
    number: request.body.number,
  })
  Persons.findByIdAndUpdate(request.params.id, { number: person.number })
    .then(savedPerson => {
      savedPerson.number=request.body.number
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})