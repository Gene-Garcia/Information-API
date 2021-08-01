const express = require('express');
const Cors = require('cors');

// Local modules
require('./models/database')

const app = express();

// middlewares
app.use(express.json());
app.use(Cors())

// Route handler
app.use('/information', require('./routes/information'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Application started at port ' + port));