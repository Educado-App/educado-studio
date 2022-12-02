const Params = require('../../../helpers/validation/params')

const { roleList } = require('../gateways')

const makeRoleController = require('./roleController')

const roleController = makeRoleController({ roleList })

module.exports = { 
    roleController
}