const express = require('express')
const router = express.Router()
const{upload}=require('../controllers/uploadFileC')

router.post('/',upload)
//router.put('/:colection/:id',[], updateImage) 
//Le pasas la coleccion de la bbdd y luego el id lo lo guardas y actualiza la coleccion guardando el uid

module.exports = router
