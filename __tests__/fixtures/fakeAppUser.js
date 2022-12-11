module.exports = function makeFakeAppUser(overrides = {}) {
    
    const fakeAppUser = {
        username: "blob",
        phone: "12345678",
        password: "ABc123456!",
        createdAt: new Date(),
        activeCourse: []
    }

    return {
        ...fakeAppUser,
        ...overrides
    }
}