const express = require('express');
const app = express();

const birds = require('./routers/birds.js')
const three = require('./routers/three.js')

app.use('/birds', birds)

app.use('/three',three)

app.listen(3000)