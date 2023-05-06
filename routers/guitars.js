const express= require('express')
const  router = express.Router()

const {getGuitars, getGuitar, addGuitar,delGuitar,updateGuitar} = require('../controllers/guitars')

const {check} =require('express-validator');
const {validarCampos} = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt');

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
    check('idUser', 'El id del usuario es necesario').not().isEmpty(),
    validarCampos
], addGuitar)
router.delete('/:id',[
    validateJWT,
    
    validarCampos
],delGuitar)

router.put('/:id',[
    validateJWT,
    
    check('marca', 'La marca es requerida').not().isEmpty(),
    check('categoria', 'La categoria es requerida').not().isEmpty(),
    check('modelo', 'El modelo es requerida').not().isEmpty(),
    check('nombre', 'El nombre es requerida').not().isEmpty(),
    check('precio', 'El precio es requerida').not().isEmpty(),
    check('idUser', 'No puedes modificar el id del usuario').isEmpty(),
    validarCampos
],updateGuitar)
module.exports=router