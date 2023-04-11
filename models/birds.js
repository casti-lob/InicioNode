const {Schema, model}= require('mongoose');
const BirdsSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    species: {
        type: String,
        required: [true, 'La especie es obligatoria'],       
    }
});



module.exports = model( 'Birds', BirdsSchema );