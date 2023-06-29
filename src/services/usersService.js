import axios from 'axios'
import { USERS_API } from '../utils/apiRoutes'

export const getUsersListDB = async () => {
	const { data } = await axios.get(`${USERS_API}/all`)
	return data
}

export const updateStatusDB = async ({ idUser, status }) => {
	await axios.put(`${USERS_API}/update-status`, { idUser, status })
}

export const searchUserDB = async (search) => {
	const { data } = await axios.get(`${USERS_API}/name?name=${search}`)

	return data
}
