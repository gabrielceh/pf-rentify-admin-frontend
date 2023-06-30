import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ADMIN_API } from '../../../utils/apiRoutes'
import {
	createUserAdminDB,
	getAllAdminsDB,
	searchAdminByNameDB,
	updateRolAdminDB,
	updateStatusAdminDB,
} from '../../../services/teamService'

const initialState = {
	team: [],
	filters: {
		status: '',
		membership: '',
	},
	next: null,
	endpoint: `${ADMIN_API}/admins-sudo`,
	status: 'idle',
	error: null,
	statusCreated: 'idle',
	errorCreated: null,
}

export const getTeamList = createAsyncThunk('team/getTeamList', async (url) => {
	try {
		return await getAllAdminsDB(url)
	} catch (error) {
		return Promise.reject(error)
	}
})

export const searchTeam = createAsyncThunk('team/searchTeam', async (search) => {
	try {
		return await searchAdminByNameDB(search)
	} catch (error) {
		return Promise.reject(error)
	}
})

export const getTeamNextList = createAsyncThunk('team/getTeamNextList', async (url) => {
	try {
		return await getAllAdminsDB(url)
	} catch (error) {
		return Promise.reject(error)
	}
})

export const createUserAdmin = createAsyncThunk('team/createUserAdmin', async (user) => {
	try {
		return await createUserAdminDB(user)
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
})

export const updateTeamtatus = createAsyncThunk(
	'team/updateTeamStatus',
	async ({ idUser, status }) => {
		try {
			await updateStatusAdminDB({ idUser, status })
			return { idUser, status }
		} catch (error) {
			return Promise.reject(error)
		}
	}
)

export const updateTeamRole = createAsyncThunk('team/updateTeamRole', async ({ idUser, role }) => {
	try {
		await updateRolAdminDB({ idUser, role })
		return { idUser, role }
	} catch (error) {
		return Promise.reject(error)
	}
})

const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {
		setEnpoint: (state, action) => {
			state.endpoint = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// GET ALL USERS
			.addCase(getTeamList.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getTeamList.fulfilled, (state, action) => {
				state.status = 'success'
				state.team = action.payload.results || action.payload
				state.next = action.payload.next || null
			})
			.addCase(getTeamList.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
			// SEARCH USERS
			.addCase(searchTeam.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(searchTeam.fulfilled, (state, action) => {
				state.status = 'success'
				state.team = action.payload.results || action.payload
				state.next = action.payload.next || null
			})
			.addCase(searchTeam.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
			// NEXT
			.addCase(getTeamNextList.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getTeamNextList.fulfilled, (state, action) => {
				state.status = 'success'
				state.team = [...state.team, ...action.payload.results] || [
					...state.team,
					...action.payload,
				]
				state.next = action.payload.next || null
			})
			.addCase(getTeamNextList.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
			// 	CREATE USER
			.addCase(createUserAdmin.pending, (state) => {
				state.statusCreated = 'loading'
			})
			.addCase(createUserAdmin.fulfilled, (state, action) => {
				state.statusCreated = 'success'
				state.team = [action.payload, ...state.team]
			})
			.addCase(createUserAdmin.rejected, (state, action) => {
				state.statusCreated = 'error'
				state.errorCreated = action.payload
			})
			// UPDATE STATUS
			.addCase(updateTeamtatus.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateTeamtatus.fulfilled, (state, action) => {
				state.status = 'success'
				const userFound = state.team.find((user) => user.idUser === action.payload.idUser)
				userFound.idUser = action.payload.idUser
				userFound.status = action.payload.status
			})
			.addCase(updateTeamtatus.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
			// UPDATE Role
			.addCase(updateTeamRole.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateTeamRole.fulfilled, (state, action) => {
				state.status = 'success'
				const userFound = state.team.find((user) => user.idUser === action.payload.idUser)
				userFound.role = action.payload.role
			})
			.addCase(updateTeamRole.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})
	},
})

export default teamSlice.reducer
