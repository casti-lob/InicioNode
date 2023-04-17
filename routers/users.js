const express = require('express')
const router = express.Router()
const{usuarioPost}=require('../controllers/users')

router.post("/addUser",usuarioPost)