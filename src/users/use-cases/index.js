const { profileList } = require('../gateways')
const { roleList } = require('../../security/authorization/gateways')

const makeAddGroup = require('./addGroup')

const addGroup = makeAddGroup({ profileList,roleList })

module.exports = {
    addGroup,
}