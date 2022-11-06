module.exports = function buildMakeSection({ Id, makeExercise }) {

    return function makeSection({
        id = Id.makeId(),
        title,
        description,
        sectionNumber,
        exercises = [],
        createdAt = new Date(),
        modifiedAt = new Date(),
    }) {
        
        if (!sectionNumber) throw new Error('Sections must have a section number')
        
        const validExercises = exercises.map(exercises => makeExercise(exercises))

        return Object.freeze({
            id,
            title,
            description,
            createdAt,
            modifiedAt,
            sectionNumber,
            getExercises: () => validExercises,
            addExercise: (exercise) => {
                const validExercise = makeExercise({ 
                    exerciseNumber: getNextExerciseNumber(validExercises), 
                    ...exercise 
                })
                exercises.push(validExercise)
            }
        })
    }

    function getNextExerciseNumber(exercises) {
        const max = Math.max(...exercises.map(exercise => exercise.exerciseNumber))

        return max + 1
    }
}