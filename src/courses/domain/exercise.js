module.exports = function buildMakeExercise({ Id, makeAnswer }) {

    return function makeExercise({
        id = Id.makeId(),
        exerciseNumber,
        content = {},
        on_wrong_feedback = {},
        answers = [],
        modifiedAt = new Date()
    }) {

        const validAnswers = answers.forEach(answer => makeAnswer(answer))

        return Object.freeze({
            id,
            exerciseNumber,
            content,
            on_wrong_feedback,
            modifiedAt,
            getAnswers: () => validAnswers,
            addAnswer: (answ) => {
                const validAnswer = makeAnswer(answ)
                answers.push(validAnswer)
            },
            totalAnswers: () => answers.length
        })

    }

}
