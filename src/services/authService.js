import axios from 'axios'
import { auth, storage } from '../firebase.config'
import {
	EmailAuthProvider,
	createUserWithEmailAndPassword,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
	updateProfile,
} from 'firebase/auth'
import { ADMIN_API, LOGIN_API, LOGOUT_API, USERS_API } from '../utils/apiRoutes'
import { getDownloadURL, ref, updateMetadata, uploadBytes } from 'firebase/storage'
import { getTokenConfig } from '../utils/tokenConfig'
import { LSVariables } from '../utils/LSVariables'

export const registerUser = async ({ email, password }) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password)
	const newUser = {
		email: user.email,
		name: user.displayName || '',
		image: user.photoURL,
		phone: user.phoneNumber,
		uid: user.uid,
	}

	const config = getTokenConfig()
	const { data } = await axios.get(`${ADMIN_API}/create-admin`, newUser, config)

	return data
}
export const login = async ({ email, password }) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password)
	const logUser = {
		email: user.email,
		uid: user.uid,
	}

	const { data } = await axios.post(LOGIN_API, logUser)

	return data
}

export const logoutUser = async () => {
	await signOut(auth)
	const config = getTokenConfig()
	const res = await axios.get(LOGOUT_API, config)
	localStorage.removeItem(LSVariables.authAdmin)
	return res
}

export const saveAndGetImage = async (file) => {
	const metadata = {
		contentType: file.type,
		name: auth.currentUser.uid,
		size: file.size,
		customMetadata: {
			size: file.size,
			uidUser: auth.currentUser.uid,
		},
	}

	const storageRef = ref(storage, `profiles/${auth.currentUser.uid}/`)
	await uploadBytes(storageRef, file)
	await updateMetadata(storageRef, metadata)
	let url = await getDownloadURL(storageRef)
	return url
}

export const updateImgDB = async ({ file, uid, idUser }) => {
	const image = await saveAndGetImage(file, uid)

	await updateProfile(auth.currentUser, {
		photoURL: image,
	})
	const config = getTokenConfig()
	await axios.patch(`${ADMIN_API}/update-image`, { idUser, image }, config)

	return image
}

export const updateNameDB = async ({ name, idUser }) => {
	await updateProfile(auth.currentUser, {
		displayName: name,
	})
	const config = getTokenConfig()
	await axios.patch(`${ADMIN_API}/update-name`, { idUser, name }, config)

	return name
}

export const updatePhoneDB = async ({ phone, idUser }) => {
	await updateProfile(auth.currentUser, {
		phoneNumber: phone,
	})
	const config = getTokenConfig()
	await axios.patch(`${ADMIN_API}/update-phone`, { idUser, phone }, config)
	return phone
}

export const changePassword = async ({ oldpassword, newpassword }) => {
	const user = auth.currentUser

	const credential = EmailAuthProvider.credential(user.email, oldpassword)

	await reauthenticateWithCredential(user, credential)

	await updatePassword(auth.currentUser, newpassword)

	return true
}

export const setInitialUserDB = async ({ idUser, token }) => {
	const config = getTokenConfig()
	const { data } = await axios.get(`${USERS_API}/${idUser}`, config)

	return { user: data, token: token }
}
