require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI_NOTES = process.env.MONGODB_URI_NOTES
const MONGODB_URI_PERSONS = process.env.MONGODB_URI_PERSONS

module.exports = {
  MONGODB_URI_NOTES,
  MONGODB_URI_PERSONS,
  PORT
}