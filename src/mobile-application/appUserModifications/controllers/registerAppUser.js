const { makeHttpError } = require('../../../helpers/error')
const { registerAppUser } = require('../use-cases')

module.exports = function makeRegisterAppUser({ registerAppUserList }) {

    return async function AddAppUser (httpRequest) {
        
        try {   
            const appUserInfo = httpRequest.body

            // source.browser = httpRequest.headers['User-Agent']
            // if (httpRequest.headers['Referer']) {
            //   source.referrer = httpRequest.headers['Referer']
            // }
            console.log(appUserInfo)

            const registered =  await registerAppUser({
                ...appUserInfo
            })

            //console.log(appUserInfo)
            
            return {
                success: true,
                statusCode: 201,
                body: registered
            }

        } catch (error) {
            console.log(error)
            return makeHttpError({ status: 400, message: error.message })
        }
    }
}


