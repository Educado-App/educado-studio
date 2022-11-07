const { makeSection } = require('../domain')

module.exports = function makeRemoveExercise({exerciseList, sectionList }) {

    return async function removeExercise({ toRemove: exerciseId, fromSection: sectionId }) {
        
        const sectionDoc = await sectionList.findById(sectionId)

        const section = makeSection({ id: sectionDoc.id, ...sectionDoc })

        section.removeExerciseById(exerciseId)
        
        await sectionList.update({
            id: section.id,
            exercises: section.getExercises().map(exercise => exercise.id),
            modifiedAt: new Date()
        })

        return await exerciseList.remove({
            id: exerciseId,
        })

    }
}

