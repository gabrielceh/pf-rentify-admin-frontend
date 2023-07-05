import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, logoutUser, setInitialUserDB, updateImgDB } from '../../../services/authService'
import { LSVariables } from '../../../utils/LSVariables'
import { firebaseErrors } from '../../../utils/firebaseErrors'
import { userToLS } from '../../../utils/userToLS'

const initialState = {
	user: {},
	login: false,
	status: 'idle',
	token: null,
	error: null,
}

export const loginAdmin = createAsyncThunk('user/loginAdmin', async ({ email, password }) => {
	try {
		return await login({ email, password })
	} catch (error) {
		if (error.code.includes('auth/')) {
			const errorMsg = firebaseErrors(error.code)
			return Promise.reject(errorMsg)
		}
		return Promise.reject(error.response.data.error)
	}
})

export const logoutAdmin = createAsyncThunk('user/logoutAdmin', async () => {
	try {
		await logoutUser()
	} catch (error) {
		if (error.code.includes('auth/')) {
			const errorMsg = firebaseErrors(error.code)
			return Promise.reject(errorMsg)
		}
		return Promise.reject(error.response.data.error)
	}
})

export const updateImageProfile = createAsyncThunk(
	'user/updateImageProfile',
	async ({ file, uid, idUser }) => {
		try {
			return await updateImgDB({ file, uid, idUser })
		} catch (error) {
			if (error.code.includes('auth/')) {
				const errorMsg = firebaseErrors(error.code)
				return Promise.reject(errorMsg)
			}
			return Promise.reject(error.response.data.error)
		}
	}
)

export const setInitialUser = createAsyncThunk('user/setInitialUser', async ({ idUser, token }) => {
	try {
		return await setInitialUserDB({ idUser, token })
	} catch (error) {
		return Promise.reject(error.response.data.error)
	}
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.token
			state.login = true
			state.status = 'success'
		},
		setImageProfile: (state, action) => {
			state.user.image = action.payload
			localStorage.setItem(
				LSVariables.authAdmin,
				JSON.stringify({ user: state.user, login: true, token: state.token })
			)
		},
		setNameProfile: (state, action) => {
			state.user.name = action.payload
			localStorage.setItem(
				LSVariables.authAdmin,
				JSON.stringify({ user: state.user, login: true, token: state.token })
			)
		},
		setPhoneProfile: (state, action) => {
			state.user.phone = action.payload
			localStorage.setItem(
				LSVariables.authAdmin,
				JSON.stringify({ user: state.user, login: true, token: state.token })
			)
		},
	},
	extraReducers: (builder) => {
		builder
			//LOGIN
			.addCase(loginAdmin.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loginAdmin.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.login = true
				state.status = 'success'
				state.token = payload.auth_token.token
				const user = userToLS(payload.user, payload.auth_token.token)
				localStorage.setItem(LSVariables.authAdmin, user)
			})
			.addCase(loginAdmin.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
			//INITIAL USER
			.addCase(setInitialUser.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(setInitialUser.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.login = true
				state.status = 'success'
				state.token = payload.token
				const user = userToLS(payload.user, payload.token)
				localStorage.setItem(LSVariables.authAdmin, user)
			})
			.addCase(setInitialUser.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})

			//LOGOUT
			.addCase(logoutAdmin.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(logoutAdmin.fulfilled, (state) => {
				state.user = {}
				state.login = false
				state.status = 'idle'
				state.error = null
				state.token = null
			})
			.addCase(logoutAdmin.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
			//UPDATE IMAGE
			.addCase(updateImageProfile.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(updateImageProfile.fulfilled, (state, { payload }) => {
				state.user.image = payload
				state.status = 'success'
			})
			.addCase(updateImageProfile.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export const { resetUser, setUser, setImageProfile, setNameProfile, setPhoneProfile } =
	userSlice.actions
export default userSlice.reducer
