const { makeExercise } = require('../domain')

module.exports = function makeEditExercise({ exerciseList }) {

    return async function editExercise({ id, changes }) {

        const exerciseDoc = await exerciseList.findById(id)

        const exercise = makeExercise({ id: exerciseDoc.id, ...changes })

        return await exerciseList.update({
            id: exercise.id,
            title: exercise.title,
            description: exercise.description,
            content: exercise.content,
            onWrongFeedback: {},
            answers: exercise.getAnswers(),
            modifiedAt: new Date(),
        })
    }
}