import axios from 'axios'
import { USERS_API } from '../utils/apiRoutes'

export const getUsersListDB = async (url) => {
	const { data } = await axios.get(url)
	return data
}

export const updateStatusDB = async ({ idUser, status }) => {
	await axios.put(`${USERS_API}/update-status`, { idUser, status })
}

export const searchUserDB = async (search) => {
	const { data } = await axios.get(`${USERS_API}/name?name=${search}`)

	return data
}

export const getOrdersByUser = async (endpoint) => {
	const { data } = await axios.get(endpoint)

	return data
}

export const getUserByIdDB = async (idUser) => {
	const { data } = await axios.get(`${USERS_API}/${idUser}`)

	return data
}
