const { profileList } = require('../gateways')

const makeGroupController = require('./groupController')

const groupController = makeGroupController({ profileList })

module.exports = { 
    groupController
}