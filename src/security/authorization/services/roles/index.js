
const superAdminRole = require('./superAdmin')
const institutionRole = require('./institution')
const roles =  [superAdminRole, institutionRole]

module.exports = {
    roles
}