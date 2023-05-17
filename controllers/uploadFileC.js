const { request, response } = require('express')
const {uploadFile} = require("../helpers/upload-file")
const User = require("../models/user")
const Guitar = require("../models/guitar")
//Para ver los ficheros
const fs = require('fs')
const path = require('path')

const upload = async(req = request, res = response) => {
    
    try{
        const name = await uploadFile(req.files,undefined,'imgs')
        res.json({name})
    
    }catch(msg){
        res.status(400).json({msg})
    }
   
}

const updateImage = async(req = request, res = response)=>{
    const {colection,id }= req.params;
    let colectionBd;
   //try{
        switch(colection){
            case "users":
                colectionBd = await User.findById(id);
                break;
            case "guitars":
                
                colectionBd = await Guitar.findById(id)

                break;
        }
        if(colectionBd.img){ //Si tiene imagen
            const oldPath = path.join(__dirname,'../uploads', colection, colectionBd.img) //Obtenemos la ruta completa
            if(fs.existsSync(oldPath)){ 
                fs.unlinkSync(oldPath)//Borramos
            }
        }
        
        const file = await uploadFile(req.files,undefined, colection)
        
        colectionBd.img = file
        console.log(colectionBd)
        const saveFile =await colectionBd.save();
        res.status(200).json({colectionBd})
   /* }catch(err){
        res.status(400).json({err})
    }*/
   
    

}

module.exports={upload, updateImage}