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

class NonMatchingPasswordError extends OperationalError {

    constructor(msg, statusCode = 400) {
        super(msg, statusCode)

        this.name = 'NonMatchingPasswordError'
    }
}

class SamePasswordError extends OperationalError {

    constructor(msg, statusCode = 400) {
        super(msg, statusCode)

        this.name = 'SamePasswordError'
    }
}

class WeakPasswordError extends OperationalError {

    constructor(msg, statusCode = 400) {
        super(msg, statusCode)

        this.name = 'WeakPasswordError'
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
    OperationalError, 
    ValidationError, 
    AuthenticationError,
    NonMatchingPasswordError,
    SamePasswordError,
    WeakPasswordError,
    HttpMethodNotAllowedError,
    makeHttpError, 
}
