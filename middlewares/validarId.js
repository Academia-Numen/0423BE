const {Cat} = require('../models/cats')

const validarID = async (req, res, next) =>{
    console.log('estoy en el middleware')
    try {
        const buscar = await Cat.findById(req.params.id)
        if (buscar !== null) {
            next() // nextFuntion ==
        } else {
            res.status(400).json({
                msg : "el id " + req.params.id + " es invalido"
            })
        }
    } catch (error) {


        
        res.status(400).json(error)
    }
}

module.exports = { validarID }