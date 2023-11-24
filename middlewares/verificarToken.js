const jwt = require('jsonwebtoken')
const {User} = require('../models/user')
require('dotenv').config()

module.exports = verificarToken = (req, res, next) =>{
    const token = req.header('JWToken')
    if (!token) {
        return res.json({
            msg: "peticion sin token"
        })
    }
    try {
        const {body} = jwt.verify(token, process.env.TOKEN)
        const user = User.findById(body.id)
        if (!user) {
            return res.json('token invalido')
        }
        next()
    } catch (error) {
        res.json(error)
    }
}