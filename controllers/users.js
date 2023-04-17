const User = require('../models/user');
const {bcryptjs} = require('bcryptjs');

const usuarioPost = async(req, res)=>{
    const {name, email, password, rol} = req.body;
    const user = new User({name,email,password,rol})

    //Encriptamos contraseña
    const salt = bcryptjs.genSaltSync();
    user.password= bcryptjs.hashSync(password,salt);

    //Guardamos en la bbdd
    await user.save();
    //Mostramos el user 
    res.json({user})

}


module.exports={usuarioPost}