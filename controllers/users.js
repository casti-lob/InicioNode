const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

async function addUser  (req, res){
    

    const {name, email, password, rol} = req.body;
    const user = new User({name,email,password,rol})

    //Comprobamos si el email ya existe de forma manual
    
    const emailExist = await User.findOne({email})
    if(emailExist){
        return res.status(400).json({mensage: 'Ya existe un usuario con ese correo'})
    }

    //Encriptamos contraseña
    const salt = bcryptjs.genSaltSync();
    user.password= bcryptjs.hashSync(password,salt);

    //Guardamos en la bbdd
    await user.save();
    //Mostramos el user 
    res.json({user})

}

async function login(req, res){
    const {email,password}= req.body;
    const user = await User.findOne({email})

    //Encriptamos para comparar la contraseña
    const validPassword= bcryptjs.compareSync(password,user.password)

    if(!user){
        return res.status(400).json({mensage:'El usuario no existe'})
    }else if(!validPassword){
        return res.status(400).json({mensage:'La contraseña no es correcta'})
    }else{
        res.json({user})
    }
}


module.exports={addUser,login}