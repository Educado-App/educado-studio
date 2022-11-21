class OperationalError extends Error {

    constructor(msg, statusCode = 500) {
        super()

        this.name = 'OperationalError'
        this.statusCode = statusCode

        // Lets users of this class define messages that are objects
        this.message = msg
    }
}

class ValidationError extends OperationalError {

    constructor(msg, statusCode = 400) {
        super(msg, statusCode)

        this.name = 'ValidationError'
    }
}


class AuthenticationError extends OperationalError {

    constructor(msg, statusCode = 401) {
        super(msg, statusCode)

        this.name = 'AuthenticationError'
    }
}


class HttpMethodNotAllowedError extends OperationalError {

    constructor(httpMethod, statusCode = 405) {
        super(`method ${httpMethod} not allowed`, statusCode)

        this.name = 'HttpMethodNotAllowedError'
    }
}

function makeHttpError({ status = 500, message }) {

    return {
        success: false,
        status,
        errors: message
    }
}

module.exports = { 
    makeHttpError, 
    OperationalError, 
    ValidationError, 
    AuthenticationError,
    HttpMethodNotAllowedError
}
