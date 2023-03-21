const express = require('express')
const router = express.Router()

// Podríamos incluir middleware específico para este router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// ruta raíz de este router
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// Ruta about
router.get('/about', function (req, res) {
  res.send('About birds')
})
// Exportamos el router para poder utilizarlo fuera
module.exports = router






