const { makeHttpError } = require('../../../helpers/error')
const { registerAppUser } = require('../use-cases')

module.exports = function makeRegisterAppUser({ }) {

    return async function addAppUser (httpRequest) {
        
        try {   
            const appUserInfo = httpRequest.body

            console.log(appUserInfo)

            const registered = await registerAppUser(appUserInfo)

            console.log(typeof registered)

            
            return {
                success: true,
                statusCode: 201,
                body: registered
            }

        } catch (error) {
            
            console.log(error)
            return {
                statusCode: 400,
                body: {
                    error: error.message
                }
            }
            
            
        } 

    }
}


