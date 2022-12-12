const authorization = require('../security/authorization/services/authorizationService')

/**
 * Adapter for express request / response callbacks
 * to work with controllers representation of http requests (mostly similar)
 */
function makeExpressCallback(requestHandler) {

    return async function callback(req, res, next) {

        const httpRequest = {
            method: req.method,
            body: req.body,
            params: req.params,
            queryParams: req.query,
            ip: req.ip,
            context: req.context,
            headers: req.headers
        }

        try {
            const response = await requestHandler(httpRequest)

            let extras = {}
    
            if (response.data instanceof Array) {
                extras['count'] = response.data.length
            }
    
            res.status(response.status || response.statusCode)
            res.send({
                status: response.status,
                success: response.success,
                ...extras,
                ...response,
            })
            
        } catch (error) {
            
            // Forward error to error handler
            next(error)
        }

    }
}

module.exports = { makeExpressCallback }