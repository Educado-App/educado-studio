
const superAdminRole = require('./superAdmin')
const institutionRole = require('./institution')
const educadoRole = require('./educadoAdmin')

const roles =  [ superAdminRole, institutionRole, educadoRole ]

module.exports = {
    roles
}