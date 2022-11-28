const { makeContentCreatorApplication } = require('../domain')

module.exports = function makeRejectCCApplication({ contentCreatorApplicationList, Email }) {

    return async function rejectCCApplication({ applicationInfo, reason }) {

        const application = makeContentCreatorApplication(applicationInfo)

        if (reason) {
            application.reject({ reason })
        }
        else application.reject()

        const updated = await contentCreatorApplicationList.update({
            id: application.getId(),
            approved: application.isApproved(),
            rejectReason: application.getRejectReason(),
            isRejected: application.isRejected(),
            modifiedAt: application.getModifiedAt()
        })

        sendRejectMail(application)

        return updated
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