const Permissions  = require('../permissions/permissions');

module.exports = AdminPermissions = {
	key: "ROLE_ADMIN",
	name: "Admins",
	permissions: [
        Permissions.VIEW_INSTITUTION,
        Permissions.EDIT_INSTITUTION,
		Permissions.ASSIGN_MODERATORS,
		Permissions.DEASSIGN_MODERATORS
    ]
}

