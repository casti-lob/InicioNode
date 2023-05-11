const express= require('express')
const  router = express.Router()

const {getGuitars, getGuitar, addGuitar,delGuitar,updateGuitar} = require('../controllers/guitars')

const {check} =require('express-validator');
const {validarCampos} = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt');
const {isAdmin} = require('../middlewares/isAdmin')
const {isOwner}= require('../middlewares/isOwner')

router.get('/', getGuitars)

router.get('/:id',[
    check('id', 'El id debe de ser de tipo mongo').isMongoId(),
    validarCampos
], getGuitar)

router.post('/add',[
    validateJWT,
    
    check('marca', 'La marca es requerida').not().isEmpty(),
    check('categoria', 'La categoria es requerida').not().isEmpty(),
    check('modelo', 'El modelo es requerida').not().isEmpty(),
    check('nombre', 'El nombre es requerida').not().isEmpty(),
    check('precio', 'El precio es requerida').not().isEmpty(),
    check('idUser', 'No puedes poner el id del usuario').isEmpty(),
    validarCampos
], addGuitar)
router.delete('/:id',[
    validateJWT,
    isAdmin,
    
    validarCampos
],delGuitar)

router.put('/:id',[
    validateJWT,
    isAdmin,
    isOwner,
    check('marca', 'La marca es requerida').not().isEmpty(),
    check('categoria', 'La categoria es requerida').not().isEmpty(),
    check('modelo', 'El modelo es requerida').not().isEmpty(),
    check('nombre', 'El nombre es requerida').not().isEmpty(),
    check('precio', 'El precio es requerida').not().isEmpty(),
    check('idUser', 'No puedes modificar el id del usuario').isEmpty(),
    validarCampos
],updateGuitar)
module.exports=router