/* Esto es para diskdb
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
*/

const Birds = require('../models/birds');

// Tenemos que hacer la función async para poder utiilzar await dentro 
async function addBird(req, res){
    //Indicamos los argumentos que vamos a soliciltar en el body de la solicitud
    const {name,species} = req.body;
    //Creamos el objeto con los datos del body
    const bird = new Birds({name,species})
    //Guardamos en la bbdd
    await bird.save();
    res.json({bird});
}

async function getBirds(req,res){
    
    
    const birds = await Birds.find()
    res.json(birds)
}

async function getBird(req,res){
    const name = req.params.name
    const bird = await Birds.find({name:name})
    if(bird.length){
        res.json(bird)
    }else{
        res.status(404).json({mensaje:`No se ha encontrado el pajaro con el nombre ${name}`})
    }
}

async function delBirds(req,res){
    const id = req.params.id
    const bird = await Birds.find({_id:id})
    if(bird.length){
        await Birds.deleteOne({_id:id})
        res.json(bird);
    }else{
        res.status(404).json({mensaje:`No se ha encontrado el pajaro con el nombre ${id}`})
    }
}

async function updateBirds(req,res){
    const id = req.params.id
    const findBird = await Birds.find({_id:id})
    const newBird = req.body
    if(findBird.length){
        await Birds.updateOne({_id:id},newBird)
        res.json(newBird);
    }else{
        res.status(404).json({mensaje:`No se ha encontrado el pajaro con el nombre ${id}`})
    }
}
module.exports={addBird,getBirds,getBird,delBirds,updateBirds};