const mongoose = require('mongoose')
const env = require("dotenv")
env.config()

const connectToMongo = () => {

    try {
        mongoose.connect(process.env.Mongo_URI)
        console.log("Connection to mongo db successfull")
    }
    catch (err) {

        console.log("Connection to mongodb failed")

    }
}

module.exports = connectToMongo