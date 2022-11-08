module.exports = function makeFakeAnswer(overides = {}) {

    const section = {
        text: "Pssst. wrong answer",
        correct: false,
        modifiedAt: new Date(),
    }

    return {
        ...section,
        ...overides
    }
}