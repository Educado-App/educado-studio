module.exports = function makeExpressCallback(endpointHandler) {

    return async function callback(req, res) {

        const httpRequest = {
            headers: req.headers,
            method: req.method,
            body: req.body,
            params: req.params,
            queryParams: req.query
        }

        const response = await endpointHandler(httpRequest)

        res.setHeader('Content-Type', 'application/json')
        res.status(response.status)
        res.send(response)
    }
}