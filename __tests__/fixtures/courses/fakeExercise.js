const makeFakeFile = require('../fakeFile')

module.exports = function makeFakeExercise(overrides = {}) {

    const exercise = {
        exerciseNumber: 1,
        content: makeFakeFile({ type: "video/mp4" }),
        on_wrong_feedback: makeFakeFile({ type: "video/mp4" }),
        answers: [],
        modifiedAt: new Date(),
    }

    return {
        ...exercise,
        ...overrides
    }
}