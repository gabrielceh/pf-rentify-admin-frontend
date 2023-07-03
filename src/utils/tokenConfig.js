import { LSVariables } from './LSVariables'

export const getTokenConfig = () => {
	const authAdmin = localStorage.getItem(LSVariables.authAdmin)
		? JSON.parse(localStorage.getItem(LSVariables.authAdmin))
		: {}

	const token = authAdmin.token || ''

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	}

	return config
}
