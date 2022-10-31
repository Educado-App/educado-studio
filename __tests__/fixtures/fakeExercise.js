const Id = require("../../src/helpers/Id")

module.exports = function makeFakeExercise(overrides = {}) {

    const exercise = {
        exerciseNumber: 1,
        content: {
            type: 'video',
            url: "https://www.youtube.com/watch?v=C0DPdy98e4c"
        },
        on_wrong_feedback: {
            type: 'video',
            url: "https://www.youtube.com/watch?v=C0DPdy98e4c"
        },
        answers: [],
        modifiedAt: new Date(),
    }

    return {
        ...exercise,
        ...overrides
    }
}