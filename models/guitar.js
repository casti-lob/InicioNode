const {Schema, model}= require('mongoose');
const GuitarSchema = Schema({
    marca: {
        type: String,
        required: [true, 'La marca es obligatorio'],
    },
    categoria: {
        type: String,
        required: [true, 'La categoria es obligatoria'],    
        emun: ['ACUSTICA', 'ELECTRICA']   
    },
    modelo:{
        type:String,
        required: [true, 'El modelo es obligatorio'],
        unique: true

    },
    nombre:{
        type:String,
        required: [true, 'El nombre es obligatorio'],


    },
    precio:{
        type:String,
        required: [true, 'El precio es obligatorio'],

    },
    idUser:{
        type: String,
        require: [true, 'El id del usuario es obligatorio']
    },
    img:{
        type:String
    }

});



module.exports = model( 'Guitar', GuitarSchema );