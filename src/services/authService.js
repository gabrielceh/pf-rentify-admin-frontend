import axios from 'axios'
import { auth, storage } from '../firebase.config'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth'
import { ADMIN_API, LOGIN_API } from '../utils/apiRoutes'
import { getDownloadURL, ref, updateMetadata, uploadBytes } from 'firebase/storage'

export const registerUser = async ({ email, password }) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password)
	const newUser = {
		email: user.email,
		name: user.displayName || '',
		image: user.photoURL,
		phone: user.phoneNumber,
		uid: user.uid,
	}

	return newUser
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
	return null
}

export const saveAndGetImage = async (file, uid) => {
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

	await axios.patch(`${ADMIN_API}/update-image`, { idUser, image })

	return image
}

export const updateNameDB = async ({ name, idUser }) => {
	await updateProfile(auth.currentUser, {
		displayName: name,
	})

	await axios.patch(`${ADMIN_API}/update-name`, { idUser, name })

	return name
}

export const updatePhoneDB = async ({ phone, idUser }) => {
	await updateProfile(auth.currentUser, {
		phoneNumber: phone,
	})

	await axios.patch(`${ADMIN_API}/update-phone`, { idUser, phone })

	return phone
}
