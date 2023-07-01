export const selectUserStatusOptions = [
	{ label: 'Status Active', value: '?status=active' },
	{ label: 'Status Inactive', value: '?status=inactive' },
	{ label: 'Status Banned', value: '?status=banned' },
	{ label: 'Membership Basic', value: 'membership/?membership=basic' },
	{ label: 'Membership Standard', value: 'membership/?membership=standard' },
	{ label: 'Membership Premiun', value: 'membership/?membership=premium' },
]

export const selectTeamStatusOptions = [
	{ label: 'Role Admin', value: '?role=admin' },
	{ label: 'Role Super', value: '?role=sudo' },
]

export const statusOptions = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
	{ label: 'Banned', value: 'banned' },
]
export const roleOptions = [
	{ label: 'Admin', value: 'admin' },
	{ label: 'Super', value: 'sudo' },
]

export const statusOrderOptions = [
	{ label: 'Approved', value: '?status=approved' },
	{ label: 'Pending', value: '?status=pending' },
	{ label: 'Rejected', value: '?status=rejected' },
]
