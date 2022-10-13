module.exports = function makeHttpError({ status = 500, message }) {
    return {
        success: false,
        status,
        errors: [{ message }]
    }
}