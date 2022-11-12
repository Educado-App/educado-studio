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
            headers: {
                'Content-Type': req.get('Content-Type'),
                'Referer': req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        }

        const response = await requestHandler(httpRequest)

        
        let extras = {}

        if (response.data instanceof Array) {
            extras['count'] = response.data.length
        }

        res.status(response.status)
        res.send({
            status: response.status,
            success: response.success,
            ...extras,
            ...response,
        })
    }
}

module.exports = { makeExpressCallback }