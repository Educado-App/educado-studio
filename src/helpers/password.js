const crypto = require("crypto");

const SALT_ROUNDS = 1000

module.exports = Object.freeze({
    encrypt,
    isValid
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