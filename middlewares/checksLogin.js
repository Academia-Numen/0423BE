const { check } = require('express-validator')

const checksLogin = [
    check("email")
        .notEmpty().withMessage('El campo nombre es requerido')
        .isString().withMessage('El campo nombre debe ser un string')
        .isEmail().withMessage('debes ingresar un mail'),
    check("password")
        .notEmpty().withMessage('El campo raza es requerido')
        .isString().withMessage('El campo raza debe ser un string'),
]

module.exports = checksLogin