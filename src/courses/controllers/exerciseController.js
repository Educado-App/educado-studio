const { makeHttpError } = require('../../helpers/error')

const { addExercise, editExercise } = require('../use-cases')


module.exports = function makeExerciseController({ exerciseList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getExercise(httpRequest)

            case 'POST':
                return await postExercise(httpRequest)

            case 'PUT':
                return await putExercise(httpRequest)

            default:
                return makeHttpError({
                    status: 405,
                    message: `Method '${httpRequest.method}' is not allowed`
                })
        }

    }

    async function getExercise(httpRequest) {

        const id = httpRequest.params.id ?? null
        try {
            const results = id ?
                await exerciseList.findById(id) :
                await exerciseList.findAll(httpRequest.queryParams)

            return {
                success: true,
                status: 200,
                data: results
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }

    async function postExercise(httpRequest) {

        const exerciseInfo = httpRequest.body
        const sectionId = httpRequest.params.sid

        try {
            const posted = await addExercise({exerciseInfo, sectionId})

            return {
                success: true,
                status: 201,
                data: posted
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }

    async function putExercise(httpRequest) {

        const exerciseChanges = httpRequest.body

        try {
            const updated = await editExercise(exerciseChanges)

            return {
                success: true,
                status: 201,
                data: updated
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }
}