const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(console.log('connected to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    validate: [
      {
        validator: v => /\d{2,3}-\d+/.test(v),
        message: props => `${props.value} is not a valid phone number!`
      },
      {
        validator: v => {
          const number = v.replace('-', '')
          if (number.length >= 8) {
            return true
          }
          return false
        },
        message: 'Phone number must be at least 8 digits'
      }
    ],
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)