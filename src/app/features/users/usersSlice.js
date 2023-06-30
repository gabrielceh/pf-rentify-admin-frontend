import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsersListDB, searchUserDB, updateStatusDB } from '../../../services/usersService'
import { USERS_API } from '../../../utils/apiRoutes'

const initialState = {
	users: [],
	filters: {
		status: '',
		membership: '',
	},
	next: null,
	endpoint: `${USERS_API}/all`,
	status: 'idle',
	error: null,
}

export const getUsersList = createAsyncThunk('users/getUsersList', async (url) => {
	try {
		return await getUsersListDB(url)
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

export const getUsersNextList = createAsyncThunk('users/getUsersNextList', async (url) => {
	try {
		return await getUsersListDB(url)
	} catch (error) {
		return Promise.reject(error)
	}
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setEnpoint: (state, action) => {
			state.endpoint = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// GET ALL USERS
			.addCase(getUsersList.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getUsersList.fulfilled, (state, action) => {
				state.status = 'success'
				state.users = action.payload.results || action.payload
				state.next = action.payload.next || null
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
				state.users = action.payload.results || action.payload
				state.next = action.payload.next || null
			})
			.addCase(searchUser.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
			// NEXT
			.addCase(getUsersNextList.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getUsersNextList.fulfilled, (state, action) => {
				state.status = 'success'
				state.users = [...state.users, ...action.payload.results] || [
					...state.users,
					...action.payload,
				]
				state.next = action.payload.next || null
			})
			.addCase(getUsersNextList.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
	},
})

export const { setEnpoint } = usersSlice.actions
export default usersSlice.reducer
