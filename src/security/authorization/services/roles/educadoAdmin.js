const Permissions  = require('../permissions/permissions');

module.exports = EducadoAdminPermissions = {
	key: "ROLE_EDUCADO_ADMIN",
	name: "Educado Admin",
	permissions: getPermissions()
}

function getPermissions() {
	let educadoPermissions = []
	for(const key in Permissions) {
		educadoPermissions.push(Permissions[key])
	}

	return educadoPermissions.slice(2, )
}