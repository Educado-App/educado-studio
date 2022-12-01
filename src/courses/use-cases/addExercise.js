const { makeExercise, makeSection } = require('../domain')

module.exports = function makeAddExercise({ exerciseList, sectionList }) {

    return async function addExercise({ exerciseInfo, sectionId }) {

        const sectionDoc = await sectionList.findById(sectionId)

        const section = makeSection(sectionDoc)
        const exercise = makeExercise({
            title: exerciseInfo.title,
            description: exerciseInfo.description,
            content: exerciseInfo.content,
            onWrongFeedback: exerciseInfo.onWrongFeedback,
            answers: exerciseInfo.answers
        })

        section.addExercise(exercise)

        await sectionList.update({
            id: section.id,
            exercises: section.getExercises().map(exercise => exercise.id),
            modifiedAt: new Date()
        })

        return await exerciseList.add({
            id: exercise.id,
            parentSection: section.id,
            exerciseNumber: exercise.exerciseNumber,
            title: exercise.title,
            description: exercise.description,
            content: exercise.content,
            onWrongFeedback: exercise.onWrongFeedback || {},
            modifiedAt: exercise.modifiedAt,
            answers: exercise.getAnswers()
        })
    }
}