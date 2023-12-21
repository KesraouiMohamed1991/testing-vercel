const mongoose = require('mongoose');

let CONNECTION_STRING = 'mongodb+srv://kesraoui15003:harlembynight@cluster0.unytmwf.mongodb.net/MarseilleSips'

const connectionString = CONNECTION_STRING;
mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
