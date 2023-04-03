//Conectamos con models
const db = require('../models/db')
db.connect('data',['guitars.json'])
function getGuitars(req, res){
   
    guitars = db.guitars.find();
    res.status(200).json(guitars)

}

function getGuitar(req, res){
    nameGuitars = req.params.name
    guitar = db.guitars.findOne({name:nameGuitars})
    if(guitar!=null){
        res.json(guitar);
    }else{
        res.status(404).json(`No se ha encontrado la guitarra con el id ${nameGuitars}`)
    }
}

function addGuitar(req,res){
    newGuitar = req.body
    db.guitars.save(newGuitar)
    res.json({newGuitar})
}

function delGuitar(req,res){
    idGuitar = req.params.id
    guitar = db.guitars.findOne({_id: idGuitar})
    if(guitar!= null){
        db.guitars.remove({_id: idGuitar})
        res.send(`Se ha borrado la guitarra`)
    }else{
        res.status(400).send(`No existe la guitarra con id${idGuitar}`)
    }
}

function updateGuitar(req,res){
    idGuitar = req.params.id
    checkguitar = db.guitars.findOne({_id: idGuitar})
    guitar= req.body
    if(checkguitar!= null){
        db.guitars.update({_id: idGuitar},guitar)
        res.json(guitar)
    }else{
        res.status(400).send(`No existe la guitarra con id${idGuitar}`)
    }
}


module.exports={getGuitars, getGuitar, addGuitar, delGuitar, updateGuitar};