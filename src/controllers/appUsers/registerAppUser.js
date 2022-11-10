const {makeHttpError} = require('../../helpers/error')

module.exports = function makeRegisterAppUser({ registerAppUser }) {

    return async function registerAppUser (httpRequest) {
        const { ...appUserInfo} = httpRequest.body
        try {   
            
            const registered =  await registerAppUser ({
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
            

            // return {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     statusCode: 400,
            //     body: {
            //         error: e.message
            //     }
            // }
        }
    }
}


