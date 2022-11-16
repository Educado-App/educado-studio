
class BaseError extends Error {
    
    constructor(msg, statusCode = 500) {
        super()
        
        super.message = msg
        this.statusCode = statusCode
        this.isOperational = true
    }
}

class ValidationError extends BaseError {

    constructor(msg, statusCode = 400) {
        super(msg, statusCode)
    }
}


function makeHttpError({ status = 500, message }) {

    return {
        success: false,
        status,
        errors: message
    }
}


module.exports = { makeHttpError, ValidationError }