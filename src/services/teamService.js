import axios from 'axios'
import { ADMIN_API, USERS_API } from '../utils/apiRoutes'
import { auth, storage } from '../firebase.config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, updateMetadata, uploadBytes } from 'firebase/storage'

export const getAllAdminsDB = async (url) => {
	const { data } = await axios.get(url)
	return data
}

export const searchAdminByNameDB = async (name) => {
	const { data } = await axios.get(`${ADMIN_API}/admins-sudo/?name=${name}`)
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

	const { data } = await axios.post(`${ADMIN_API}/create-admin`, newUser)
	return data
}

export const saveAndGetImageCreate = async (file, uid) => {
	const metadata = {
		contentType: file.type,
		name: uid,
		size: file.size,
		customMetadata: {
			size: file.size,
			uidUser: uid,
		},
	}

	const storageRef = ref(storage, `profiles/${uid}/`)
	await uploadBytes(storageRef, file)
	await updateMetadata(storageRef, metadata)
	let url = await getDownloadURL(storageRef)
	return url
}

export const updateStatusAdminDB = async ({ idUser, status }) => {
	await axios.put(`${USERS_API}/update-status`, { idUser, status })
}

export const updateRolAdminDB = async ({ idUser, role }) => {
	await axios.patch(`${ADMIN_API}/update-role`, { idUser, role })
}
