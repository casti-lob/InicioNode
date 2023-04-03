const express = require('express');
const app = express();

const birds = require('./routers/birds.js')
const guitars = require('./routers/guitars.js')

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


app.listen(3000)