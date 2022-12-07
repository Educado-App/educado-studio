/**
  * Validating new app user
  * 
  * Last Modified: 30-11-2022
  **/

module.exports = function buildMakeAppUser({ Phone, Password }) {

    return function makeAppUser({
        phone,
        username,
        password,
        createdAt = new Date()
    } = {}) {

        // Validates only numbers are used in the phone number
        if (!Phone.isValid(phone)) throw new Error("User must have a valid phone number")
        // This should be changed to 10 before production
        if (!(phone.length >= 8)) throw new Error("Phone Number must be at least 8 characters")
        if (!(phone.length <= 11)) throw new Error("Phone number can at most be 11 characters")
        
        if (!password) throw new Error("User must have a password")
        if (!(password.length >= 8)) throw new Error("Password should be at least 8 characters long")
        if (password.search("[A-Z]" && "[a-z]") == -1) throw new Error("Password must contain a letter")
    
        // If no error is thrown, then salt and hash the password
        const { salt, hash } = Password.encrypt(password)

        return Object.freeze({
            phone: phone,
            username: username,
            salt: salt,
            hash: hash,
            createdAt: createdAt
        })

    }
}