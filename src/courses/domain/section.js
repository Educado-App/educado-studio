module.exports = function buildMakeSection({ Id, makeExercise }) {

    return function makeSection({
        id = Id.makeId(),
        title,
        sectionNumber,
        exercises = [],
        createdAt = new Date(),
        modifiedAt = new Date(),
    }) {

        const validExercises = exercises.map(exercises => makeAnswer(exercises))

        return Object.freeze({
            id,
            title,
            sectionNumber,
            createdAt,
            modifiedAt,
            getExercises: () => validExercises,
            addExercise: (exercise) => {
                const validExercise = makeExercise({ exerciseNumber: getNextExerciseNumber(validExercises), ...exercise })
                exercises.push(validExercise)
            }
        })

    }

    function getNextExerciseNumber(exercises) {
        const max = Math.max(...exercises.map(exercise => exercise.exerciseNumber))
        return max + 1
    }
}
