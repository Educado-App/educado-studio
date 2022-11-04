const { makeExercise } = require('../domain')

module.exports = function makeEditExercise({ exerciseList }) {

    return async function editExercise({ ...changes }) {

        const exercise = makeExercise({ id: changes._id, ...changes })

        return await exerciseList.update({
            id: exercise.getId(),
            title: exercise.getTitle(),
            content: exercise.getContent(),
            OnWrongFeedback: exercise.getOnWrongFeedback(),
            modifiedAt: new Date(),
        })
    }
}