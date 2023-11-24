const express = require('express')
const router = express.Router()
const userController= require('../controller/userController')
const auth= require('../middlewares/auth')
const checksLogin = require('../middlewares/checksLogin')
const {validarCheck} = require('../middlewares/validarCheck')
const verificarToken = require('../middlewares/verificarToken')

router.get('/session', userController.session)
router.get('/consultar',auth, userController.consultarSession)
router.get('/borrar', userController.cerrarSession)
router.get('/hash', userController.hash)


router.post('/login',checksLogin,validarCheck ,userController.login)
router.delete('/logout', userController.logout)

//jwt
router.post('/token', userController.pruebaJWT)
router.get('/test', verificarToken, userController.testearToken)
router.post('/logintoken',checksLogin,validarCheck ,userController.loginConToken)


module.exports = router