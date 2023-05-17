const {Schema, model}=require('mongoose');
const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
       
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio'],
        
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN', 'USER']
    },
    state:{
        type: Boolean,
        default:true
    },
    img:{
        type:String
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('User',UserSchema);