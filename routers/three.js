const express = require('express');
const router = express.Router();

//Middleware para procesar el body
router.use(express.json());

router.get('/',(req,res)=>{
    res.send('Home');
})

router.get('/help',function(req,res){
    res.send('Ayuda!')
})

router.post('/',(req,res)=>{
    res.send(req.body)
})

//Para procesar los parametros enviados mediante una url
router.use(express.urlencoded({extended: true}))
router.get('/:id',(req,res)=>{
    const articleId= req.params.id;

    getElement(articleId, (error,user)=>{
        if(error){
            return res.status(500).send(error);
        }else{
            res.status(200).send(user)
        }
    })
})


module.exports=router