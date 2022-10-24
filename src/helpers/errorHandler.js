/**
 * Based off of https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
 * Error handler for the express middleware
 */
 const errorHandler = (err, req, res, next) => {
    const errorMessage = err.message
    const errorStatusCode = err.status || err.statusCode

    /**
     * If response headers have already been sent,
     * delegate to the default Express error handler.
     */
    if (res.headersSent) {
        return next(err)
    }

    //Send a formatted json response
    res.status(errorStatusCode)
    res.json(
        {
            success: false,
            status: errorStatusCode,
            errors: errorMessage,
        }
    )
    
    //Ensure any remaining middleware are run.
    next()
}

module.exports = errorHandler