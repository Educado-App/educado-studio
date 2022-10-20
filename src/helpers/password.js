const crypto = require("crypto");

const SALT_ROUNDS = 1000

module.exports = Object.freeze({
    encrypt,
    isValid,
    generateRandomPassword
})

function encrypt(plainPassword) {
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(plainPassword, salt, SALT_ROUNDS, 64, 'sha256').toString('hex');

    return { salt, hash }
}

function isValid({ password, hash, salt }) {
    let hashVerify = crypto.pbkdf2Sync(password, salt, SALT_ROUNDS, 64, 'sha256').toString('hex');
    return hash === hashVerify;
}

function generateRandomPassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;

}