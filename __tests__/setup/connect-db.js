const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const mongoosePlugins = require('../../src/helpers/mongoose/plugins')

const globalConfigPath = path.join(__dirname, 'globalConfigMongo.json')

module.exports = function connectDb() {

    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'))

    if (!globalConfig) return

    mongoose.connect(globalConfig.mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error"));

    // Load any global mongoose plugins
    for (let plugin of mongoosePlugins) {
        mongoose.plugin(plugin)
    }

}