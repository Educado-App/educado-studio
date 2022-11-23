const { makeContentCreatorApplication } = require('../domain')

module.exports = function makeAddCCApplication({ contentCreatorApplicationList, Email }) {

    return async function addCCApplication(applicationInfo) {

        const application = makeContentCreatorApplication({
            firstName: applicationInfo.firstName,
            lastName: applicationInfo.lastName,
            email: applicationInfo.email,
            motivation: applicationInfo.motivation
        })

        sendConfirmationEmail(application)

        return await contentCreatorApplicationList.add({
            id: application.getId(),
            firstName: application.getFirstName(),
            lastName: application.getLastName(),
            email: application.getEmail(),
            motivation: application.getMotivation(),
            approved: application.isApproved(),
            isRejected: application.isRejected(),
            rejectReason: application.getRejectReason(),
            createdAt: application.getCreatedAt(),
            modifiedAt: application.getModifiedAt(),
        })

    }

    function sendConfirmationEmail(applicant) {

        Email.send({
            to: applicant.getEmail(),
            subject: "Successfully applied for content creator status!",
            text: 
            `
            Congratulations ${applicant.fullname()} !

            
            You have successfully applied for content creator status!
            Please wait while our moderators review your application.
            This can take anywhere from 1-10 days. If you haven't heard back from us then, 
            feel free to reach out to us!


            Best regards, the Educado team
            `
          })
    }
}