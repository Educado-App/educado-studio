module.exports = Object.freeze({
    isValid
})

function isValid(email) {
    const regEx = new RegExp("^[0-9a-zA-Z.]+@[a-zA-Z]+.[a-zA-Z]{2,4}")
    return regEx.test(email)
}