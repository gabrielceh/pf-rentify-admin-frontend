import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsersListDB } from '../../../services/usersService'

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

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
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
	},
})

export default usersSlice.reducer
