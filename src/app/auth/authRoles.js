/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	leader: ['admin', 'leader'],
	staff: ['admin', 'leader', 'staff'],
	user: ['admin', 'leader', 'staff', 'user'],
	onlyGuest: []
};

export default authRoles;
