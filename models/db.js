const db = require('diskdb');
db.connect('./data', ['guitars'])

module.exports=db