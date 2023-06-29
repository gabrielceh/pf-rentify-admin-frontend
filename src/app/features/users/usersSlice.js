import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsersListDB, searchUserDB, updateStatusDB } from '../../../services/usersService'

const initialState = {
	users: [],
	filters: {
		status: '',
		membership: '',
	},
	pagination: {
		offset: 0,
		limit: 20,
	},
	endpoint: '',
	status: 'idle',
	error: null,
}

export const getUsersList = createAsyncThunk('users/getUsersList', async () => {
	try {
		return await getUsersListDB()
	} catch (error) {
		return Promise.reject(error)
	}
})

export const updateUserStatus = createAsyncThunk(
	'users/updateUserStatus',
	async ({ idUser, status }) => {
		try {
			await updateStatusDB({ idUser, status })
			return { idUser, status }
		} catch (error) {
			return Promise.reject(error)
		}
	}
)

export const searchUser = createAsyncThunk('users/searchUser', async (search) => {
	try {
		return await searchUserDB(search)
	} catch (error) {
		return Promise.reject(error)
	}
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// GET ALL USERS
			.addCase(getUsersList.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getUsersList.fulfilled, (state, action) => {
				state.status = 'success'
				state.users = action.payload
			})
			.addCase(getUsersList.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
			// UPDATE STATUS
			.addCase(updateUserStatus.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateUserStatus.fulfilled, (state, action) => {
				state.status = 'success'
				const userFound = state.users.find((user) => user.idUser === action.payload.idUser)
				userFound.idUser = action.payload.idUser
				userFound.status = action.payload.status
			})
			.addCase(updateUserStatus.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
			// SEARCH USERS
			.addCase(searchUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(searchUser.fulfilled, (state, action) => {
				state.status = 'success'
				state.users = action.payload
			})
			.addCase(searchUser.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
	},
})

export default usersSlice.reducer
