const { request, response} = require('express')
const Guitars = require('../models/guitar');

const isOwner = async(req= request, res=response, next) => {
    const idGuitar = req.params.id //Obtengo idGuitar por el id del req params
    const {_id} = req.userd // Pillo el id de la uid
    const guitar = await Guitars.find({_id: idGuitar}) // encuentro la guitarra
    const owner = guitar[0].idUser // intento obtener el dueño del post con la idUser del post
   
    if(!_id==owner){
        return res.status(401).json({
            msg: 'No eres el propietario'
        });
    }else{
       
        req.guitar = guitar[0];
        next()
    }
}

module.exports = { isOwner}