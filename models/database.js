const mongoose = require('mongoose');

// Database
/* ref: https://itqna.net/questions/52475/reuse-connections-nodejs-mongoose
   It says that mongoose connection should be connected in the main app
   so that the connection will only be made once

   ref: https://www.youtube.com/watch?v=voDummz1gO0&ab_channel=CodAffection
   But this implementation shows a more seperated and structured way of
   connecting to the database
 */

const DB_NAME = 'openInfoAPIDB'
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
// to avoid the deprecation notice on findbyidandupdate
mongoose.set('useFindAndModify', false);
// End Database

require('./information')