const { request, response} = require('express')

const isAdmin = async(req= request, res=response, next) => {
 
    const {rol, name} = req.userd

    if(rol!== "ADMIN"){
        return res.status(401).json({
            msg: `Para borrar el usuario es admin y ${name} no lo es`
        })
    }
    next();
}
module.exports={isAdmin}