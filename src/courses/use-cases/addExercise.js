const { makeExercise, makeSection } = require('../domain')

module.exports = function makeAddExercise({ exerciseList, sectionList }) {

    return async function addExercise({ exerciseInfo, sectionId }) {

        const sectionDoc = await sectionList.findById(sectionId)

        const section = makeSection({ id: sectionDoc.id, ...sectionDoc })
        const exercise = makeExercise(exerciseInfo)

        section.addExercise(exercise)

        await sectionList.update({
            id: section.id,
            exercises: section.getExercises().map(exercise => exercise.id),
            modifiedAt: new Date()
        })


        return await exerciseList.add({
            id: exercise.id,
            exerciseNumber: exercise.exerciseNumber,
            content: exercise.content,
            onWrongFeedback: exercise.onWrongFeedback,
            modifiedAt: exercise.modifiedAt,
            answers: exercise.getAnswers()
        })
    }
}