module.exports = Object.freeze({
    isValid
})

function isValid (phone) {
    const regEx = new RegExp('^[0-9]+$')
    return regEx.test(phone)
}