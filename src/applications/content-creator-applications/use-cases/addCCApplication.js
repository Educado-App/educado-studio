const { makeContentCreatorApplication } = require('../domain')

module.exports = function makeAddCCApplication({ contentCreatorApplicationList }) {

    return async function addCCApplication(applicationInfo) {

        const application = makeContentCreatorApplication({ id: applicationInfo._id, ...applicationInfo })

        return await contentCreatorApplicationList.add({
            id: application.getId(),
            firstName: application.getFirstName(),
            lastName: application.getLastName(),
            email: application.getEmail(),
            motivation: application.getMotivation(),
            approved: application.isApproved(),
            rejectReason: application.getRejectReason(),
            createdAt: application.getCreatedAt(),
            modifiedAt: application.getModifiedAt(),
        })

    }
}