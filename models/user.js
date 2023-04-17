const {Schema, model}=require('mongoose');
const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
        
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio'],
        unique: true
    },
    rol:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    }
})
module.exports = model('User',UserSchema);