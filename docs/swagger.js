const YAML = require('yamljs')

const swaggerDocument = YAML.load(__dirname + '/specification.yml')

module.exports = swaggerDocument