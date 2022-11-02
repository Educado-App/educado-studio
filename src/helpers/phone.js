const config = require("../../env/config/keys")

module.exports = Object.freeze({
    isValid
})

function isValid (phone) {
    const regEx = new RegExp("^[0-9]{8,12}")
    return regEx.test(phone)
}