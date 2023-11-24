const express = require('express')
const router = express.Router()
const ApiController = require('../controller/apiController')
const {validarID} = require('../middlewares/validarId')
const checks = require('../middlewares/checks')
const {validarCheck} = require('../middlewares/validarCheck')


// un metodo http - una expresion de la urn -  middleware -> callback
router.get('/list', ApiController.apiGet)
router.get('/gatito/:id',validarID, ApiController.buscarPorId)
router.post('/crear',checks, validarCheck, ApiController.apiPost)
router.put('/editar/:id',validarID,checks,validarCheck, ApiController.apiPut)
router.delete('/borrar/:id', validarID,ApiController.apiDelete)

/*
users - origin
users - view



*/


module.exports = router