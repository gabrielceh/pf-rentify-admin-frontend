import axios from 'axios'
import { auth } from '../firebase.config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { LOGIN_API } from '../utils/apiRoutes'

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
