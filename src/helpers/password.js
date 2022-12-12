const crypto = require("crypto");

const { WeakPasswordError } = require("./error");


const SALT_ROUNDS = 1000

module.exports = Object.freeze({
    encrypt,
    isValid,
    generateRandomPassword,
    isStrong
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

/**
 * 
 * @param {*} password a plain password
 * @returns a 2 item list [bool, error]. First item is a boolean if the password is strong or not.
 *          Second item contains an error object
 */
function isStrong(password = '') {
    let error

    if (!(password.length >= 8))        error = new WeakPasswordError("Password should be atleast 8 characters long")
    if (password.search("[A-Z]") == -1) error = new WeakPasswordError("Password must contain one capital letter")

    if (error) {
        return [false, error]
    }

    return [true, false]
}

function generateRandomPassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    let password = "";
    let randomNumber

    for (let i = 0; i <= passwordLength; i++) {
        randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;

}