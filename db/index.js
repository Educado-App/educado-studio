const mongoose = require("mongoose");

function connectToDb(uri, options = {}) {

  const connection = mongoose.connect(uri, options);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));

  return connection
}

module.exports = { connectToDb };
