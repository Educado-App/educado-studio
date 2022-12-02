/*
Functions to be auto run upon server start
*/
const { addRole } = require('../use-cases')
const { roles }  = require('./roles')
const { roleList } = require('../gateways')

module.exports = async function setupPermissions() {
        //deletes roles collection from the database at app start up 
        await roleList.remove({})

        //post all roles into database
        roles.forEach(role =>postRole(role))
}

//posts a role to the database
async function postRole(role) {
    try{
        const posted = await addRole({key: role.key, name: role.name, permissions: role.permissions})
        return {
            success: true,
            status: 201,
            data: posted
        }
    }catch(err){
        return {
            success: false,
            status: 400,
        }
    }
}


// Gets a role from the database
/*async function getRole(role) {
    try{
        const id = role.id

        const results = id ?
            await role.findById(id) :
            await role.findAll()
        //const posted = await addRole({key: role.key, name: role.name, permissions: Object.keys(role.permissions)})

        return {
            success: true,
            status: 200,
            data: results
        }
    }catch(err){

        return {
            success: false,
            status: 400,
        }
    }
}*/
