import axios from 'axios'
import { USERS_API } from '../utils/apiRoutes'
import { getTokenConfig } from '../utils/tokenConfig'

export const getUsersListDB = async (url) => {
	const config = getTokenConfig()

	const { data } = await axios.get(url, config)
	return data
}

export const updateStatusDB = async ({ idUser, status }) => {
	const config = getTokenConfig()
	await axios.put(`${USERS_API}/update-status`, { idUser, status }, config)
}

export const searchUserDB = async (search) => {
	const config = getTokenConfig()
	const { data } = await axios.get(`${USERS_API}/all?search=${search}`, config)

	return data
}

export const getOrdersByUser = async (endpoint) => {
	const config = getTokenConfig()
	const { data } = await axios.get(endpoint, config)

	return data
}

export const getUserByIdDB = async (idUser) => {
	const config = getTokenConfig()
	const { data } = await axios.get(`${USERS_API}/${idUser}`, config)

	return data
}
