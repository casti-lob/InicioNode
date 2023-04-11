const express = require('express');
const { dbConnection } = require('./database/config.js');
const app = express();
//PARA QUE FUNCIONE EL .env
require ('dotenv').config();
const birds = require('./routers/birds.js')
const guitars = require('./routers/guitars.js')


async function connectAtlas(){
    await dbConnection()
}
connectAtlas()
console.log(process.env.PRUEBA)
//middleware
app.use(express.json())

require('./models/db')

app.use('/birds', birds)
app.use('/birds/:name',birds)
app.use('birds/add',birds)
app.use('birds/:id',birds);



app.use('/guitars',guitars)
app.use('/guitars/:name',guitars)
app.use('guitars/add',guitars)
app.use('guitars/:id',guitars)


app.listen(process.env.PORT)
console.log(`Server listening on port${process.env.PORT}`)