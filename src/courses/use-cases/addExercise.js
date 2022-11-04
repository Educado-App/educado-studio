const { makeExercise, makeSection } = require('../domain')

module.exports = function makeAddExercise({ exerciseList, sectionList }) {

    return async function addExercise({ exerciseInfo, sectionId }) {

        const sectionDoc = await sectionList.findById(sectionId)

        const section = makeSection({ id: sectionDoc.id, ...sectionDoc })
        const exercise = makeExercise(exerciseInfo)

        section.addExercise(exercise)

        await sectionList.update({
            id: section.getId(),
            exercises: section.getExercises().map(exercise => exercise.id),
            modifiedAt: new Date()
        })


        return await exerciseList.add({
            id: exercise.getId(),
            exerciseNumber: exercise.getExerciseNumber(),
            content: exercise.getContent(),
            onWrongFeedback: exercise.getOnWrongFeedback(),
            modifiedAt: exercise.modifiedAt(),
            answers: exercise.getAnswers(),
            totalAnswers: exercise.totalAnswers()
        })
    }
}