const db = require('../models/db')
db.connect('data',['birds.json'])
function getBirds(req, res){
   
    birds = db.birds.find();
    res.status(200).json(birds)

}

function getBird(req, res){
    nameBird = req.params.name
    bird = db.birds.findOne({name:nameBird})
    if(bird!=null){
        res.json(bird);
    }else{
        res.status(404).json(`No se ha encontrado el pajaro con el nombre ${nameBird}`)
    }
}

function addBird(req, res){
    const newBird= req.body
    db.birds.save(newBird)
    res.json({newBird})
}

function delBirds(req,res){
    nameBird = req.params.id
    bird = db.birds.findOne({_id: nameBird})
    if(bird!=null){
        db.birds.remove({_id: nameBird})
        res.send(`Se ha borrado el elemento`)
    }else{
        res.status(400).send(`No existe el pajaro con nombre${nameBird}`)
    }
}

function updateBirds(req, res){
    idBirds = req.params.id
    checkBird= db.birds.findOne({_id: idBirds})
    bird = req.body
    if(checkBird!=null){
        db.birds.update({_id:idBirds},bird)
        res.json(bird)
    }else{
        res.status(400).send(`No existe ningun pajaro con el id ${idBirds}`)
    }
   
}


module.exports={getBirds, getBird, addBird, delBirds, updateBirds};