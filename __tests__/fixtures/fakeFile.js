module.exports = function makeFakeFile(overides = {}) {

    const file = {
        path: "testpathtosomefolder/test.png",
        type: "image/png",
        size: 9999,
        filename: "test.png",
    }

    return {
        ...file,
        ...overides
    }
}