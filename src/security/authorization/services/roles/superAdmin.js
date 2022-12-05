const Permissions  = require('../permissions/permissions');

module.exports = SuperAdminPermissions = {
	key: "ROLE_SUPER_ADMIN",
	name: "Super Admin",
	permissions: getAllPermissions()
}

function getAllPermissions() {
	let allPermissions = []
	for(const key in Permissions) {
		allPermissions.push(Permissions[key])
	}
	return allPermissions
}
	
