const express = require('express')
const router = express.Router()
const{upload, updateImage}=require('../controllers/uploadFileC')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')

router.post('/',upload)
router.put('/:colection/:id',[
    check('colection','Solo se aceta la coleccion guitars o users').isIn(['guitars','users']),
    check('id','No existe el id').isMongoId(),
    validarCampos

], updateImage) 
//Le pasas la coleccion de la bbdd y luego el id lo lo guardas y actualiza la coleccion guardando el uid

module.exports = router
