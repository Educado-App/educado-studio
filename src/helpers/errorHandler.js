/**
 * Based off of https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
 * Error handler for the express middleware
 */

const { OperationalError } = require('./error')

const NATIVE_PROGRAMMER_ERRORS = [
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError
]

const errorHandler = (err, req, res, next) => {

    /**
     * If response headers have already been sent,
     * delegate to the default Express error handler.
     */
    if (res.headersSent) {
        return next(err)
    }

    let isProgrammerError = false

    for (let programmerError of NATIVE_PROGRAMMER_ERRORS) {
        if (err instanceof OperationalError){
            isProgrammerError = false
            break
        }
        if (
            err instanceof programmerError ||
            err.name === 'Error'
        ) {
            isProgrammerError = true
            break
        }
    }

    if (isProgrammerError) {
        handleProgrammerError(err, req, res, next)
    }
    else {

        // Display a nicely formatted error API response to client
        const errorStatusCode = err.status || err.statusCode || 500

        let finalResponse = {
            success: false,
            status: errorStatusCode,
            type: err.name,
        }

        if (err.message instanceof Object) finalResponse.errors = err.message
        else finalResponse.message = err.message

        if (err.reason) finalResponse.detail = err.reason.message

        res.status(errorStatusCode)
        res.send(finalResponse)

        //Ensure any remaining middleware are run.
        next()
    }

}

const handleProgrammerError = (err, req, res, next) => {

    if (process.env.NODE_ENV === "production") {
        // Exit gracefully but don't leak any error traces
        // @TODO: Do some logging here ---
        process.exit(1)
    }

    // Delegate to the default express error handler to display error
    next(err)

}

module.exports = errorHandler
