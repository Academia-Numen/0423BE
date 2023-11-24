const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB) 
        console.log('base de datos conectada')
    } catch {
        console.log('error al conectar con la base de datos')
    }
}

module.exports = {connect}