const mongoose = require('mongoose')
const dotenv = require('dotenv')

const mongoDB = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`

mongoose.connect(mongoDB, { useNewUrlParser: true })
            .then(db => console.log('db connected'))
            .catch(err => console.log(err))

module.exports = mongoose
