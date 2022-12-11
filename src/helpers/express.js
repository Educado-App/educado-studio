const authorization = require('../security/authorization/services/authorizationService')

/**
 * Adapter for express request / response callbacks
 * to work with controllers representation of http requests (mostly similar)
 */
function makeExpressCallback(requestHandler) {

    return async function callback(req, res) {

        const httpRequest = {
            method: req.method,
            body: req.body,
            params: req.params,
            queryParams: req.query,
            ip: req.ip,
            context: req.context,
            headers: req.headers
        }

        await requestHandler(httpRequest)
        .then(response => {
        
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
        })
        .catch(e => res.status(500).send({ error: e }))

    }
}

module.exports = { makeExpressCallback }