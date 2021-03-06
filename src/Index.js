const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
const {mongoose} = require('./database');
const cors = require('cors');
const {createRoles,createSitesTypes} = require('./libs/initialSetup');


//Setings 
app.set('port', process.env.PORT || 3000)
createRoles()
createSitesTypes()

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors())

//Routes
app.use('/api', require('./routes/sitesRoutes'));
app.use('/api/user', require('./routes/userRoutes'));



//Staticfiles
app.use(express.static(__dirname+'/public'));
console.log(__dirname+'/public');

//Starting server
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`)
})