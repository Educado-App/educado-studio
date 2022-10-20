const { makeHttpError } = require('../../../helpers/error')
const { makeContentCreatorApplication } = require('../domain')

module.exports = function makeContentCreatorApplicationController({ contentCreatorApplicationList, userList, Email, Params, Id }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getContentCreatorApplication(httpRequest)

            case 'POST':
                if ('action' in httpRequest.queryParams) {
                    return await postContentCreatorApplicationWithActions(httpRequest)
                }
                else {
                    return await postContentCreatorApplication(httpRequest)
                }
            default:
                return makeHttpError({
                    status: 405,
                    message: `Method '${httpRequest.method}' is not allowed`
                })
        }

    }

    async function getContentCreatorApplication(httpRequest) {

        const id = httpRequest.params.id ?? null
        try {
            const results = id ?
                await contentCreatorApplicationList.findById(id) :
                await contentCreatorApplicationList.findAll(httpRequest.queryParams)

            return {
                success: true,
                status: 200,
                data: results
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }

    }

    async function postContentCreatorApplication(httpRequest) {

        const applicationInfo = httpRequest.body

        try {

            const validCCApplication = makeContentCreatorApplication(applicationInfo)

            const created = await contentCreatorApplicationList.add({
                id: validCCApplication.getId(),
                firstName: validCCApplication.getFirstName(),
                lastName: validCCApplication.getLastName(),
                email: validCCApplication.getEmail(),
                motivation: validCCApplication.getMotivation(),
                approved: validCCApplication.isApproved(),
                rejectReason: validCCApplication.getRejectReason(),
                createdAt: validCCApplication.getCreatedAt(),
                modifiedAt: validCCApplication.getModifiedAt(),
            })

            return {
                success: true,
                status: 201,
                data: created
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }

    async function postContentCreatorApplicationWithActions(httpRequest) {
        const allowedActionsSchema = {
            type: 'object',
            properties: { 'action': { enum: ['approve', 'reject'] } },
            required: ['action']
        }

        const id = httpRequest.params.id
        const rejectionReason = httpRequest.body.reason
        const { action, errors } = Params.validate({ schema: allowedActionsSchema, data: httpRequest.queryParams })
        console.log(action);
        console.log(rejectionReason);
        console.log(id);
        
        if (errors) { return makeHttpError({ status: 400, message: errors }) }

        if (!Id.isValid(id)) {
            return makeHttpError({ status: 400, message: `Invalid or missing id` })
        }

        const existing = await contentCreatorApplicationList.findById(id)

        if (!existing) {
            return makeHttpError({ status: 400, message: `No content creator application with id '${id}' was found` })
        }

        const application = makeContentCreatorApplication({ id: existing._id, ...existing })

        if (action === 'approve') {
            application.approve()
            sendApprovalMail(application)
        }
        else {
            if (rejectionReason) {
                application.reject({ reason: rejectionReason })
                sendRejectMail(application)
            }
            else { application.reject() }

        }

        try {
            const updated = await contentCreatorApplicationList.update({
                id: application.getId(),
                approved: application.isApproved(),
                rejectReason: application.getRejectReason(),
                modifiedAt: new Date()
            })

            return {
                success: true,
                status: 200,
                data: updated
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }

    }

    async function sendApprovalMail(application) {
        Email.send({
            to: application.getEmail(),
            subject: "Congratulations!",
            text: "Congratulations! " + application.getFirstName() + " " + application.getLastName() +
                "\n\nYour content creator application has been approved! " +
                "\n\nBest regards, the Educado team"
        });
    }


    async function sendRejectMail(application) {
        Email.send({
            to: application.getEmail(),
            subject: "Your application has been rejected.",
            text: "We regret to inform you that your application for the status of content creator " +
                'has been rejected upon the following reason "' + application.getRejectReason() +
                '"\nIf you believe this is an error, please feel free to contact us!' +
                '\n\nBest regards, the Educado team'
        });
    }

}
