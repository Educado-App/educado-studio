const { makeHttpError } = require('../../helpers/error')

const { addExercise, editExercise, removeExercise } = require('../use-cases')


module.exports = function makeExerciseController({ exerciseList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getExercise(httpRequest)

            case 'POST':
                return await postExercise(httpRequest)

            case 'PUT':
                return await putExercise(httpRequest)

            case 'DELETE':
                return await deleteExercise(httpRequest)

            default:
                return makeHttpError({
                    status: 405,
                    message: `Method '${httpRequest.method}' is not allowed`
                })
        }

    }

    async function getExercise(httpRequest) {

        const exerciseId = httpRequest.params.eid
        const sectionId = httpRequest.params.sid

        try {
            const results = exerciseId ?
                await exerciseList.findById(exerciseId) :
                await exerciseList.findAllBySectionId(sectionId)

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
            const posted = await addExercise({ exerciseInfo, sectionId })

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
        const exerciseId = httpRequest.params.eid

        try {
            const updated = await editExercise({ 
                id: exerciseId, 
                changes: exerciseChanges 
            })

            return {
                success: true,
                status: 202,
                data: updated
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }

    async function deleteExercise(httpRequest) {

        const exerciseId = httpRequest.params.eid
        const sectionId = httpRequest.params.sid

        try {
            await removeExercise({
                fromSection: sectionId,
                toRemove: exerciseId,
            })

            return {
                success: true,
                status: 204,
                data: {}
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }
}