const { makeProfile } = require('../domain')

module.exports = function makeAddGroup({ profileList,roleList }) {

    return async function addGroup(profileInfo) {


        const group = await roleList.findById(profileInfo.groups)


        const profile = makeProfile({
            user: profileInfo.user,
            firstName: profileInfo.firstName+"idiot",
            lastName: profileInfo.lastName,
            groups: group
        })

        return await profileList.update({
            id: profile.id,
            user: profile.user,
            firstName: profile.firstName,
            lastName: profile.lastName,
            groups: profile.groups
        })
    }
}