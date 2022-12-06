const Params = require('../../helpers/validation/params')

const { profileList } = require('../gateways')

const makeProfileController = require('./profileController')
const makeGroupController = require('./groupController')

const groupController = makeGroupController({ profileList })
const profileController = makeProfileController({ profileList, Params })

module.exports = {
    groupController,
    profileController
}