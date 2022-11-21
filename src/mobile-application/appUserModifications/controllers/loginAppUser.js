const { makeHttpError } = require('../../../helpers/error')
const { authenticateAppUser } = require('../use-cases')

module.exports = function makeLoginAppUser({ }) {

    return async function loginAppUser (httpRequest) {
        const appUserPhone = httpRequest.params.phone
        console.log(appUserPhone)       

        try {

            const validPhone = await registerAppUser(appUserPhone)

            console.log(typeof registered)

            //console.log(appUserInfo)
            
            return {
                success: true,
                statusCode: 201,
                body: registered
            }

            

        } catch (e) {

        }
    }
}