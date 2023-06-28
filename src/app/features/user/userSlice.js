import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, logoutUser } from '../../../services/authService'
import { LSVariables } from '../../../utils/LSVariables'
import { firebaseErrors } from '../../../utils/firebaseErrors'

const initialState = {
	user: {},
	login: false,
	status: 'idle',
	error: null,
}

export const loginAdmin = createAsyncThunk('user/loginAdmin', async ({ email, password }) => {
	try {
		return await login({ email, password })
	} catch (error) {
		console.log(error)
		if (error.code.includes('auth/')) {
			const errorMsg = firebaseErrors(error.code)
			return Promise.reject(errorMsg)
		}
		return Promise.reject(error)
	}
})

export const logoutAdmin = createAsyncThunk('user/logoutAdmin', async () => {
	try {
		return await logoutUser()
	} catch (error) {
		console.log(error)
		if (error.code.includes('auth/')) {
			const errorMsg = firebaseErrors(error.code)
			return Promise.reject(errorMsg)
		}
		return Promise.reject(error)
	}
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
			state.login = true
			state.status = 'success'
		},
		resetUser: (state) => {
			state.user = {}
			state.login = false
			state.status = 'idle'
			state.error = null
			localStorage.removeItem(LSVariables.authAdmin)
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
				console.log('payload', payload)
				state.user = payload
				state.login = true
				state.status = 'success'
				localStorage.setItem(LSVariables.authAdmin, JSON.stringify({ user: payload, login: true }))
			})
			.addCase(loginAdmin.rejected, (state, action) => {
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
				localStorage.removeItem(LSVariables.authAdmin)
			})
			.addCase(logoutAdmin.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export const { resetUser, setUser } = userSlice.actions
export default userSlice.reducer
