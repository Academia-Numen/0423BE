const { check } = require('express-validator')

const checks = [
    check("nombre")
        .notEmpty().withMessage('El campo nombre es requerido')
        .isString().withMessage('El campo nombre debe ser un string'),
    check("raza")
        .notEmpty().withMessage('El campo raza es requerido')
        .isString().withMessage('El campo raza debe ser un string'),
    check("color")
        .notEmpty().withMessage('El campo color es requerido')
        .isString().withMessage('El campo color debe ser un string'),
    check("edad")
        .notEmpty().withMessage('El campo edad es requerido')
        .isNumeric().withMessage('El campo edad debe ser un number'),
]

module.exports = checks