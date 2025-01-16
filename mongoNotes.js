
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const collection = 'noteApp'

const url =
    `mongodb+srv://teissieralexia:${password}@fullstackcourseatb.xezle.mongodb.net/${collection}?retryWrites=true&w=majority&appName=fullstackcourseATB`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})