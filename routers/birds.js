const express = require('express')
const router = express.Router()
const {getBirds, getBird, addBird, delBirds, updateBirds} = require('../controllers/birds')


// ruta raíz de este router
router.get('/', getBirds)
router.get('/:name',getBird)
router.post('/add', addBird)
router.delete('/:id',delBirds)
router.put('/:id', updateBirds)



module.exports = router






