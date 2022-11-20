const { makeUser, makeProfile } = require('../../users/domain')
const { makeContentCreatorApplication } = require('../domain')

module.exports = function makeApproveCCApplication({ userList, contentCreatorApplicationList, profileList, Email, Password }) {

    return async function approveApplication(applicationInfo) {

        const application = makeContentCreatorApplication(applicationInfo)
        application.approve()

        const updatedApplication = await contentCreatorApplicationList.update({
            id: application.getId(),
            approved: application.isApproved(),
            modifiedAt: new Date()
        })

        /* Create user account and profile for this user */
        const oneTimePassword = Password.generateRandomPassword()
        const validUser = makeUser({
            email: application.getEmail(),
            password: oneTimePassword
        })

        const profile = makeProfile({
            firstName: application.getFirstName(),
            lastName: application.getLastName(),
            user: validUser
        })

        await userList.add(validUser)
        await profileList.add(profile)


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
