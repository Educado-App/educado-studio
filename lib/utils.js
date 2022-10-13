const crypto = require("crypto");

// Uses the crypto library to decrypt the hash using the salt and then compares
// the decrypted hash/salt with the password that the user provided at login
const validPassword = (password, hash, salt) => {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
    return hash === hashVerify;
}

module.exports.validPassword = validPassword

// This function takes a plain text password and creates a salt and hash out of it. Instead of storing the plaintext
// password in the database, the salt and hash are stored for security
const genPassword = (password) => {
    let salt = crypto.randomBytes(32).toString('hex');
    let generatedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');

    return {
        salt: salt,
        hash: generatedHash
    }
}

module.exports.genPassword = genPassword;