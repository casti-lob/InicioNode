const express = require('express')
const router = express.Router()
const{addUser,login,delUser}=require('../controllers/users')

//importamos el middleware de validación
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')
const {isValidRol} =require('../helpers/db_validators')
const{validateJWT}= require('../middlewares/validate-jwt')
router.post('/',[ 
    check('name','El nobre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que tener una longitud minima de 3 caracteres').isLength({min:3}),
    check('password','El password es obligatorio').not().isEmpty(),
    check('rol').custom(isValidRol),
    validarCampos
],addUser)

router.post('/auth/login',[
    check('email','El email es requerido').not().isEmpty(),
    check('password','El password es requerido').not().isEmpty(),
    validarCampos
],login)

router.delete('/:id',[
    validateJWT,
    check('id','No existe el usuario').isMongoId(),
    validarCampos
],delUser)

module.exports = router