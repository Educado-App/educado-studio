const mongoose = require("mongoose");
const config = require('../env/config/keys')
const mongoosePlugins = require('../src/helpers/mongoose/plugins')

module.exports = function setupDb() {

  // Connect to the mongoose database
  connectToDb(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })


  // Load any global mongoose plugins
  for (let plugin of mongoosePlugins) {
    mongoose.plugin(plugin)
}

}

function connectToDb(uri, options = {}) {

  const connection = mongoose.connect(uri, options);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));

  return connection
}

