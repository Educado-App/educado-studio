const {makeHttpError} = require('../../helpers/error')

export default function makeRegisterAppUser({ addAppUser }) {

    return async function registerAppUser (httpRequest) {
        try {
        
            const { source = {}, } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
        
            
            const registered = await registerAppUser({
                phone,
                password,
                date,
                source
            })

            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(posted.modifiedOn).toUTCString()
                },
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


