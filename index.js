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


let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
  ]

  const Persons = require('./models/person')

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  app.get('/info', (request, response) => {
    let date = new Date();
    response.send('<p>Phonebook has info for '+Persons.length+' people</p><p>'+date+'</p>')
  })
  app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Persons.find({}).then(person => {
        response.json(person)
      })
  })
  app.get('/api/persons/:id', (request, response) => {
    // const id = request.params.id
    // const person = persons.find(person => person.id === id)
    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }
    Persons.findById(request.params.id).then(person => {
        response.json(person)
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  // const generateId = () => {
  //   return Math.floor(Math.random() * 1000);
  // }

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
    }
    // TODO LATER - from 3.14, step 2
    // if (persons.find(person => person.name===body.name)){
    //     return response.status(400).json({ 
    //         error: 'person already exists' 
    //       })
    // }

    const person = new Persons({
        name: body.name,
        number: body.number,
    })
    // const person = {
    //     id: generateId(),
    //     name: body.name,
    //     number: body.number,
    // }
  
    // persons = persons.concat(person)
  
    // response.json(person)
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})