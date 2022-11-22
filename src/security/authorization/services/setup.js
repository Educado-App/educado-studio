/*
Functions to be autorun upon server start
*/
const { addRole } = require('../use-cases')
const { adminRole }  = require('./roles')

const setupDb = require('../../../../db')
setupDb()


async function postRole(role) {
    try{
        const posted = await addRole({key: role.key, name: role.name, permissions: Object.keys(role.permissions)})
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

postRole(adminRole);
console.log(adminRole);



//TODO: import gateways to remove collection, fix permissions file to be uploaded, iterate through all roles and upload. 