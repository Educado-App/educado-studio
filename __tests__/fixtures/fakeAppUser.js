const Id = require('../../src/helpers/Id')

module.exports = function makeFakeAppUser(overrides = {}) {
    
    const fakeAppUser = {
        phone: "12345678",
        password: "ABc123456!",
        loggedInAt: new Date()
    }

    return {
        ...fakeAppUser,
        ...overrides
    }
}