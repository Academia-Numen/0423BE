const { validationResult } = require('express-validator')

const validarCheck = (req, res ,next) =>{
    const error = validationResult(req)
    if (error.isEmpty()) {
        next()
    } else {
        res.status(400).json(error)
    }
}

module.exports = {validarCheck}