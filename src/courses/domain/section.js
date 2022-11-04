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

        const validExercises = exercises.map(exercises => makeExercise(exercises))

        return Object.freeze({
            id,
            title,
            description,
            createdAt,
            modifiedAt,
            getSectionNumber : () => sectionNumber,
            setSectionNumber : (n) => sectionNumber = n,
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