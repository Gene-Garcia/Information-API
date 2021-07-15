const express = require('express');

// Local modules
require('./models/database')
const mongoose = require('mongoose');
const Information = mongoose.model('Information');

const app = express();

app.use(express.urlencoded({extended:true}));



const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Application started at port ' + port));