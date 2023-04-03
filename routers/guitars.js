const express= require('express')
const  router = express.Router()

const {getGuitars, getGuitar, addGuitar,delGuitar,updateGuitar} = require('../controllers/guitars')

router.get('/', getGuitars)

router.get('/:name', getGuitar)

router.put('/add', addGuitar)
router.delete('/:id',delGuitar)
router.put('/:id',updateGuitar)
module.exports=router