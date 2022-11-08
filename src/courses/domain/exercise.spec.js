const makeFakeExercise = require('../../../__tests__/fixtures/courses/fakeExercise')
const makeFakeAnswer = require('../../../__tests__/fixtures/courses/fakeAnswer')

const { makeExercise } = require('.')

describe('Exercise', () => {

    it('should throw an error if none of the answers given is correct', async () => {

        const wrongAnswer = makeFakeAnswer({ correct: false })
        const anotherWrongAnswer = makeFakeAnswer({ correct: false })

        const withOnlyWrongAnswers = makeFakeExercise({ answers: [wrongAnswer, anotherWrongAnswer] })

        expect(() => makeExercise(withOnlyWrongAnswers)).toThrow("Atleast one answer should be the correct one")
    })

})