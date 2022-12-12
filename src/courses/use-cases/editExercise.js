const { makeExercise } = require('../domain')

module.exports = function makeEditExercise({ exerciseList }) {

    return async function editExercise({ id, changes }) {

        const exerciseDoc = await exerciseList.findById(id)

        const exercise = makeExercise({ id: exerciseDoc.id, ...changes })

        const toChange = {
            id: exercise.id,
            title: exercise.title,
            description: exercise.description,
            answers: exercise.getAnswers(),
            modifiedAt: new Date(),
        }

        if (changes.content)           toChange.content = changes.content
        if (changes.onWrongFeedback)   toChange.onWrongFeedback = changes.onWrongFeedback

        return await exerciseList.update(toChange)
    }
}