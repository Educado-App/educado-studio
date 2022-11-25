const Permissions = require('../permissions/permissions');

module.exports =  InstitutionPermissions = { 
	key: "ROLE_INSTITUTION",
	name: "Institution",
	permissions: [
        Permissions.VIEW_INSTITUTION,
        Permissions.EDIT_INSTITUTION,
		Permissions.ASSIGN_MODERATORS,
		Permissions.DEASSIGN_MODERATORS
    ]
}