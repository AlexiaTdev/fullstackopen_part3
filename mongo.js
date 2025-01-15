
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const collection = 'persons'

const url =
    `mongodb+srv://teissieralexia:${password}@fullstackcourseatb.xezle.mongodb.net/${collection}?retryWrites=true&w=majority&appName=fullstackcourseATB`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personsSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personsSchema)


if (process.argv[3] && process.argv[4]) {

    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })
    
    person.save().then(result => {
    console.log('Added', person.name, 'number', person.number, 'to phonebook')
      mongoose.connection.close()
    })
} else if (process.argv[3] && !process.argv[4]){
    console.log('give a number for person', process.argv[3])
    process.exit(1)
} else if (!process.argv[3] && !process.argv[4]) {
    Person.find({}).then(result => {
        console.log('phonebook :')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

