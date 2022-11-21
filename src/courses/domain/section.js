const { ValidationError } = require("../../helpers/error")

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
        
        if (!sectionNumber) throw new ValidationError('Sections must have a section number')
        
        validExercises = exercises.map(exercises => makeExercise(exercises))

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
                    exerciseNumber: getNextExerciseNumber(), 
                    ...exercise,
                })
                
                validExercises.push(validExercise)
            },
            removeExerciseById
        })


        function getNextExerciseNumber() {
            if (validExercises.length > 0) {
                const max = Math.max(...exercises.map(exercises => exercises.exercisesNumber))
                return max + 1
            }
            return 1
        }
        
        function removeExerciseById(id) {
            const reducedExercises = validExercises.filter(exercise => !(exercise.id === id))

            validExercises = reducedExercises
        }
    }

}