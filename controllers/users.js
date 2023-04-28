const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const {genJWT} = require('../helpers/genJWT')

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
    user.state
    //Guardamos en la bbdd
    await user.save();
    //Mostramos el user 
    res.json({user})

}

async function login(req, res){
    const {email,password}= req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({mensage:'El usuario no existe'})
        }else{
            if(!user.state){
                return res.status(400).json({msg:'El usuario no esta activo'})
            }else{
                const validPassword= bcryptjs.compareSync(password,user.password)
                if(!validPassword){
                    return res.status(400).json({mensage:'La contraseña no es correcta'})
                }else{
                    if(!user.state){
                        return res.status(400).json({msg:'El usuario esta inactivo'})
                    }else{
                        //Generamos el token
                        const token = await genJWT(user._id)
                        res.json({
                            token,
                            msg:'READY!!'})
                    }
                   
            }
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Ha ocurrido un error inesperado'})
    }

}

async function delUser(req,res){
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id,{"state": false});
    const token = req.user
    res.json({user, token})
}


module.exports={addUser,login,delUser}