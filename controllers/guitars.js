//Conectamos con models
const db = require('../models/db')
const Guitars = require("../models/guitar")
db.connect('data',['guitars.json'])
const Users = require("../models/user");

async function getGuitars(req, res){
   //queryParams
   const {nombre} = req.query;
    let guitars;
    if(!nombre){
        guitars = await Guitars.find({});
    }else if(nombre){
        guitars = await Guitars.find({nombre});
    }
   if(guitars.length){
    res.status(200).json(guitars)
   }else{
    res.status(404).json(`La base de datos esta vacia, inserte datos`)
   }
    

}

async function getGuitar(req, res){
    const id = req.params.id
    const guitar = await Guitars.find({_id: id})
    if(!guitar.length){
        res.json(guitar);
    }else{
        res.status(404).json(`No se ha encontrado la guitarra con el id ${id}`)
    }
}

async function addGuitar(req,res){
    const {marca,categoria,modelo,nombre,precio} = req.body
    const user = req.userd
    const idUser= user._id
    console.log(idUser)
    const guitar = new Guitars({marca,categoria,modelo,nombre,precio,idUser})
    
   
        await guitar.save();
        res.json({guitar})
   
    
}

async function delGuitar(req,res){
 /*
    const {userId} = req.query
    let user;
    if(!userId){
        res.status(400).send(`Necesitas la query userId`)
    }else{
        user = await Users.findById(userId)
        const idGuitar = req.params.id
        const guitar = await Guitars.find({_id: idGuitar})
        if(user.rol != "ADMIN"){
            if(guitar.length){
                await Guitars.deleteOne({_id:idGuitar})
                res.json(guitar)
            }else{
                res.status(400).send(`No existe la guitarra con id${idGuitar}`)
            }
        }else{
            res.status(400).send(`El usuario ${user.name} no es ADMINISTRADOR`)
        }
    }

*/
    const idGuitar = req.params.id    
    const guitar = await Guitars.find({_id: idGuitar})
    if(guitar.length){
        await Guitars.deleteOne({_id:idGuitar})
        res.json(guitar)
    }else{
        res.status(400).send(`No existe la guitarra con id${idGuitar}`)
    }
}

async function updateGuitar(req,res){
    const newGuitar= req.body
    const guitar = req.guitar
    const idGuitar = guitar._id
    const checkguitar = await Guitars.find({_id: idGuitar})
    
    
    if(checkguitar.length){
        await Guitars.updateOne({_id: idGuitar},newGuitar)
        res.json(newGuitar)
    }else{
        res.status(400).send(`No existe la guitarra con id ${idGuitar}`)
    }
   
    
}



module.exports={getGuitars, getGuitar, addGuitar, delGuitar, updateGuitar};