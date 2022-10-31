/**
 * Based off of https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
 * Error handler for the express middleware
 */

const errorHandler = (err, req, res, next) => {

    const errorStatusCode = err.status || err.statusCode || 500

    /**
     * If response headers have already been sent,
     * delegate to the default Express error handler.
     */
    if (res.headersSent) {
        return next(err)
    }

    //Send a formatted json response
    res.status(errorStatusCode)
    res.send({
        success: false,
        status: errorStatusCode,
        errors: err.message || err.errors.message || err.errors
    })

    //Ensure any remaining middleware are run.
    next()
}

module.exports = errorHandler
