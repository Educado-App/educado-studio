const { Permissions } = require('../permissions/permissions');


const InstitutionOwner = { 
	name: "Institution owner",
	permissions: [
        Permissions.VIEW_INSTITUTION,
        Permissions.EDIT_INSTITUTION,
		Permissions.ASSIGN_MODERATORS,
		Permissions.DEASSIGN_MODERATORS
    ]
}