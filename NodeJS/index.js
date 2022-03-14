const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const {mongoose} = require('./DB.js');
var employeeController = require('./Controllers/employeeController.js')

var app=express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.listen(4000,() => console.log('Server started at port 4000'));

app.use('/Employees',employeeController)