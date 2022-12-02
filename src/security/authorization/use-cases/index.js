const { roleList } = require('../gateways')

const makeAddRole = require('./addRole')



const addRole = makeAddRole({ roleList })


module.exports = {
    addRole,
}