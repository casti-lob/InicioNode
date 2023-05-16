const express = require('express');


const app = express();
//PARA QUE FUNCIONE EL .env
require ('dotenv').config();
const birds = require('./routers/birds.js')
const guitars = require('./routers/guitars.js')
const users = require('./routers/users.js')
const file = require('./routers/files.js')

//subida fichero
const fileUpload = require('express-fileupload')
//Conexion MondoDB
const { dbConnection } = require('./database/config.js');
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

//middleware
app.use(express.json())

require('./models/db')

app.use('/birds', birds)
app.use('/birds/:name',birds)
app.use('birds/add',birds)
app.use('birds/:id',birds);



app.use('/guitars',guitars)
app.use('/guitars/:id',guitars)
app.use('guitars/add',guitars)
app.use('guitars/:id',guitars)

app.use('/users',users)
app.use('/users/auth/login',users)
app.use('users/:id',users)

//Subida de fichero
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}))
app.use('/uploadFile', file)


app.listen(process.env.PORT)

console.log(`Server listening on port${process.env.PORT}`)