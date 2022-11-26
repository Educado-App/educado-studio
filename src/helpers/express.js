// function makeExpressCallback (requestHandler) {
//     return async function callback (req, res) {

//         const httpRequest = {
//             method: req.method,
//             body: req.body,
//             queryParams: req.query,
//             params: req.params,
//             ip: req.ip,
//             method: req.method,
//             context: req.context,
//             path: req.path,
//             headers: {
//                 'Content-Type': req.get('Content-Type'),
//                 Referer: req.get('referer'),
//                 'User-Agent': req.get('User-Agent')
//             }
//         }
//         requestHandler(httpRequest)
//             .then(httpResponse => {
//                 if (httpResponse.headers) {
//                     res.set(httpResponse.headers)
//                 }
//                 res.type('json')
//                 res.status(httpResponse.statusCode)
//                 res.send(httpResponse.body)
//             })
//             .catch(e => res.status(500).send({ error: 'An unkown error occurred.' }))
//     }
// }

// module.exports = { makeExpressCallback }

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

        await requestHandler(httpRequest)
        .then(response => {
        
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
        })
        .catch(e => res.status(500).send({ error: e }))
    }
}

module.exports = { makeExpressCallback }
