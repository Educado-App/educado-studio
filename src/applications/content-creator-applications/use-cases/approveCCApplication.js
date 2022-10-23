const { makeUser } = require('../../../users')
const { makeContentCreatorApplication } = require('../domain')

module.exports = function makeApproveCCApplication({ userList, contentCreatorApplicationList, Email, Password }) {

    return async function approveApplication(applicationInfo) {

        const application = makeContentCreatorApplication({ id: applicationInfo._id, ...applicationInfo })
        application.approve()

        const updatedApplication = await contentCreatorApplicationList.update({
            id: application.getId(),
            approved: application.isApproved(),
            modifiedAt: new Date()
        })

        const oneTimePassword = Password.generateRandomPassword()
        const validUser = makeUser({
            firstName: application.getFirstName(),
            lastName: application.getLastName(),
            email: application.getEmail(),
            password: oneTimePassword
        })

        await userList.add(validUser)

        sendApprovalMail(application, oneTimePassword)

        return updatedApplication
    }

    async function sendApprovalMail(application, password) {
        Email.send({
            to: application.getEmail(),
            subject: "Congratulations!",
            text: "Congratulations! " + application.getFirstName() + " " + application.getLastName() +
                "\n\nYour content creator application has been approved! " +
                "\nTo login use your email and this temporary password: " + password +
                "\nMake sure to change your password as soon as possible." +
                "\n\nBest regards, the Educado team"
        })
    }
}
