const {Cat} = require('../models/cats')


const ApiController = {
    async apiGet (req,res) {
        //.find() - todo lo hay en la base de datos
        //Cat.find({raza:req.params.raza})

        const listadoDeGatos = await Cat.find()
        res.status(200).json(listadoDeGatos)
    },
    async buscarPorId (req, res) {
        console.log('estoy en el controlador')
        // findById - para devuelve el objeto que coincide con el id
        //Cat.findOne({duenio:req.params.duenio}) - 
        const buscar = await Cat.findById(req.params.id)
        res.status(200).json(buscar)
    },
    async apiPost (req, res) {
        const nuevoGatito = new Cat(req.body)
        await nuevoGatito.save()
        res.status(201).json(nuevoGatito) 
    },
    async apiPut (req, res) {
        await Cat.findByIdAndUpdate(req.params.id, req.body)
        //Cat.findOneAndUpdate
        const buscar = await Cat.findById(req.params.id)
        res.status(200).json(buscar)
    },
    async apiDelete (req, res) {
        //Cat.findOneAndDelete
        await Cat.findByIdAndDelete(req.params.id)
        res.status(200).json({
            msg: "el gatito con el id " + req.params.id + " fue borrado"
        })
    }
}

module.exports = ApiController