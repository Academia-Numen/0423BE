const index = (req/* request */, res/*response */) => { // metodo http - expresion - callback
    res.send('Hello World!') // el metodo para enviar contenido estatico o en formato texto
  }

module.exports = {index}