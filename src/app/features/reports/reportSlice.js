import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getReportsFromDB } from '../../../services/reportService'

const initialState = {
	data: {
		'users': [],
		'products': [],
		'user-membership': [],
		'products-featured': [],
		'orders': [],
		'suscriptions': [],
	},
	status: 'idle',
	error: null,
}

export const getReport = createAsyncThunk('report/getReport', async () => {
	try {
		return await getReportsFromDB()
	} catch (error) {
		return Promise.reject(error)
	}
})

const reportSlice = createSlice({
	name: 'report',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getReport.pending, (state) => {
			state.status = 'loading'
		})
		builder.addCase(getReport.fulfilled, (state, { payload }) => {
			state.data.users = payload.users
			state.data.products = payload.products
			state.data['user-membership'] = payload['user-membership']
			state.data['products-featured'] = payload['products-featured']
			state.data.orders = payload.orders
			state.data.suscriptions = payload.suscriptions
			state['status'] = 'success'
		})
		builder.addCase(getReport.rejected, (state, action) => {
			state.status = 'error'
			state.error = action.payload.error
		})
	},
})

export default reportSlice.reducer
