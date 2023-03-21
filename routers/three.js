const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Home');
})

router.post('/pos',(req,res)=>{
    res.send(req.body);
})

module.exports=router