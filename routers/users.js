const express = require('express')
const router = express.Router()
const{addUser}=require('../controllers/users')

//importamos el middleware de validación
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')
const {isValidRol} =require('../helpers/db_validators')

router.post('/',[ 
    check('name','El nobre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que tener una longitud minima de 3 caracteres').isLength({min:3}),
    check('password','El password es obligatorio').not().isEmpty(),
    check('rol').custom(isValidRol),
    validarCampos
],addUser)

module.exports = router