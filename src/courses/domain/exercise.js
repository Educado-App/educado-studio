const { ValidationError } = require("../../helpers/error")

module.exports = function buildMakeExercise({ Id, makeAnswer }) {

    return function makeExercise({
        id = Id.makeId(),
        exerciseNumber,
        content = {},
        onWrongFeedback = {},
        answers = [],
        modifiedAt = new Date()
    }) {

        const validAnswers = validateAnswers(answers)

        return Object.freeze({
            id,
            exerciseNumber,
            content,
            onWrongFeedback,
            modifiedAt,
            getAnswers: () => validAnswers,
            addAnswer: (answ) => {
                const validAnswer = makeAnswer(answ)
                answers.push(validAnswer)
            },
            totalAnswers: () => validAnswers.length
        })
    }

    function validateAnswers(answers) {
        if (answers.length === 0) return

        containsCorrectAnswers(answers)

        return answers.map(answer => makeAnswer(answer))

    }

    function containsCorrectAnswers(answers) {

        let containsCorrect
        for (let answer of answers) {
            if (answer.correct) containsCorrect = true
        }

        if (!containsCorrect) {
            throw new ValidationError("Atleast one answer should be the correct one")
        }
    }

}
