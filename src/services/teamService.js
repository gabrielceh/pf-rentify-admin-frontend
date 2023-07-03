import axios from 'axios'
import { ADMIN_API, USERS_API } from '../utils/apiRoutes'
import { auth, storage } from '../firebase.config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, updateMetadata, uploadBytes } from 'firebase/storage'
import { getTokenConfig } from '../utils/tokenConfig'

export const getAllAdminsDB = async (url) => {
	const config = getTokenConfig()
	const { data } = await axios.get(url, config)
	return data
}

export const searchAdminByNameDB = async (name) => {
	const config = getTokenConfig()
	const { data } = await axios.get(`${ADMIN_API}/admins-sudo/?search=${name}`, config)
	return data
}

export const createUserAdminDB = async ({ email, password }) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password)

	const newUser = {
		email: user.email,
		name: '',
		image: null,
		phone: null,
		uid: user.uid,
	}
	const config = getTokenConfig()
	const { data } = await axios.post(`${ADMIN_API}/create-admin`, newUser, config)
	return data
}

export const updateStatusAdminDB = async ({ idUser, status }) => {
	const config = getTokenConfig()
	await axios.put(`${USERS_API}/update-status`, { idUser, status }, config)
}

export const updateRolAdminDB = async ({ idUser, role }) => {
	const config = getTokenConfig()
	await axios.patch(`${ADMIN_API}/update-role`, { idUser, role }, config)
}
