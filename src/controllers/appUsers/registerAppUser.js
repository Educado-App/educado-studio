const {makeHttpError} = require('../../helpers/error')

module.exports = function makeRegisterAppUser({ registerAppUser }) {

    return async function AddAppUser (httpRequest) {
        
        try {   
            const { source = {}, ...appUserInfo} = httpRequest.body

            // source.browser = httpRequest.headers['User-Agent']
            // if (httpRequest.headers['Referer']) {
            //   source.referrer = httpRequest.headers['Referer']
            // }
            console.log(appUserInfo)

            const registered =  await registerAppUser({
                ...appUserInfo
            })

            
            return {
                success: true,
                statusCode: 201,
                body: { registered }
            }

        } catch (error) {
            console.log(error)
            return makeHttpError({ status: 400, message: error.message })
        }
    }
}


