const express = require('express')
const router = express.Router()
const main = require('../controllers/birds')

// ruta raíz de este router
router.get('/', main)


module.exports = router






