const { HttpMethodNotAllowedError } = require('../../helpers/error')

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
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }

    }

    async function getExercise(httpRequest) {

        const exerciseId = httpRequest.params.eid
        const sectionId = httpRequest.params.sid

        const results = exerciseId ?
            await exerciseList.findById(exerciseId) :
            await exerciseList.findAllBySectionId(sectionId)

        return {
            success: true,
            status: 200,
            data: results
        }
    }

    async function postExercise(httpRequest) {
        const exerciseInfo = httpRequest.body
        const sectionId = httpRequest.params.sid

        const posted = await addExercise({ exerciseInfo, sectionId })

        return {
            success: true,
            status: 201,
            data: posted
        }
    }

    async function putExercise(httpRequest) {

        const exerciseChanges = httpRequest.body
        const exerciseId = httpRequest.params.eid

        const updated = await editExercise({
            id: exerciseId,
            changes: exerciseChanges
        })

        return {
            success: true,
            status: 202,
            data: updated
        }
    }

    async function deleteExercise(httpRequest) {

        const exerciseId = httpRequest.params.eid
        const sectionId = httpRequest.params.sid

        await removeExercise({
            fromSection: sectionId,
            toRemove: exerciseId,
        })

        return {
            success: true,
            status: 204,
            data: {}
        }
    }
}