const app = require('./app')
require('dotenv').config()

const port = process.env.PORT || 3000 // declaramos un puerto

app.listen(port, () => { // listen = el motodo que va a levantar el servidor
    console.log(`El servidor se levanto en el puerto: ${port}`)
})