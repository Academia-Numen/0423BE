const bcrypt = require('bcryptjs')
const {User}= require('../models/user')
const generadorJWT = require('../utils/generadorwjt')

const userController = {
    session (req, res) {
        const user = {
            id: "1234567890",
            nombre: "juan",
            idioma: "español"
        }
        req.session.user = user
        res.cookie('cookieDelUsuario', user.idioma, {maxAge: 120000}) // 120000 == 2 minutos
        res.json({
            msg: "se creo la session y la cookie"
        })
    },
    consultarSession (req, res) {
        res.json({session: req.session.user, cookie: req.cookies.cookieDelUsuario})
    },
    cerrarSession (req ,res) {
        res.clearCookie('cookieDelUsuario')
        req.session.destroy()
        res.json({
            msg: "session cerrada"
        })
    },
    hash(req, res) {
        const salt = bcrypt.genSaltSync(15)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const test1 = bcrypt.compareSync(req.body.password, hash)
        const test2 = bcrypt.compareSync("milanesa88", hash)
        res.json({
            pass: req.body.password,
            passHash: hash,
            test1,
            test2
        })
    },
    async register (req, res) {
        const salt = bcrypt.genSaltSync(15)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const usuarioConHash = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        }
        const nuevoUsuario = new User(usuarioConHash)
        await nuevoUsuario.save()
        res.status(201).json(nuevoUsuario) 
    },
    async login (req, res) {
        try {
            const persona = await User.findOne({email: req.body.email})
            if (persona == null) {
                return res.json({
                    msg: "el mail o la contraseña son invalido"
                })
            }
            if (!bcrypt.compareSync(req.body.password, persona.password)) {
                return res.json({
                    msg: "el mail o la contraseña son invalido"
                })
            }
            const user = {
                _id: persona._id,
                name: persona.name
            }
            req.session.user = user

            if (req.body.remember) {
                res.cookie('cookieDelUsuario', req.session.user, {maxAge: 120000})
            }
            res.json({
                msg: "usuario logeado"
            })
        } catch (error) {
            res.json(error)
        }
    },
    logout (req, res) {
        req.session.destroy()
        res.clearCookie('cookieDelUsuario')
        res.json({
            msg: "session cerrada"
        })
    },

    // jwt

    pruebaJWT (req, res) {
        const token = generadorJWT(req.body)
        res.json(token)
    },
    testearToken (req, res) {
        res.json({
            msg:"paso el token"
        })
    },
    async loginConToken (req, res) {
        try {
            const persona = await User.findOne({email: req.body.email})
            if (persona == null) {
                return res.json({
                    msg: "el mail o la contraseña son invalido"
                })
            }
            if (!bcrypt.compareSync(req.body.password, persona.password)) {
                return res.json({
                    msg: "el mail o la contraseña son invalido"
                })
            }
            const token = generadorJWT({id: persona._id, name: persona.name})
            res.json({
                msg: "token generado",
                token
            })
        } catch (error) {
            res.json(error)
        }
    }

}


module.exports = userController