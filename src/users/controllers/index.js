const { profileList } = require('../gateways')

const makeProfileController = require('./profileController')
const makeGroupController = require('./groupController')

const groupController = makeGroupController({ profileList })
const profileController = makeProfileController({ profileList })

module.exports = { 
    groupController,
    profileController
}