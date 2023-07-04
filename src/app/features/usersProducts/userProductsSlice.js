import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getProductsListDB,
	searchUserProduct,
	updateStatusProductDB,
} from '../../../services/usersProductsService'
import { PRODUCTS_API } from '../../../utils/apiRoutes'

const initialState = {
	products: [],
	state: 'idle',
	error: null,
	next: null,
	endpoint: `${PRODUCTS_API}/all`,
}

export const getUsersProducts = createAsyncThunk('usersProducts/getUsersProducts', async (url) => {
	try {
		return await getProductsListDB(url)
	} catch (error) {
		console.log(error)
		return Promise.reject(error.response.data.error)
	}
})

export const searchUserProducts = createAsyncThunk(
	'usersProducts/searchUserProducts',
	async (search) => {
		try {
			return await searchUserProduct(search)
		} catch (error) {
			if (error.response) {
				return Promise.reject(error.response.data.error)
			}
			return Promise.reject(error.message)
		}
	}
)

export const updateProductStatus = createAsyncThunk(
	'usersProducts/updateProductStatus',
	async ({ idProd, statusPub }) => {
		try {
			await updateStatusProductDB({ idProd, statusPub })
			return { idProd, statusPub }
		} catch (error) {
			console.log(error)
			if (error.response) {
				return Promise.reject(error.response.data.error)
			}
			return Promise.reject(error.message)
		}
	}
)

const userProductsSlice = createSlice({
	name: 'userProducts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// GET ALL USERS PRODUCTS
			.addCase(getUsersProducts.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getUsersProducts.fulfilled, (state, action) => {
				state.status = 'success'
				state.products = action.payload.results || action.payload
				state.next = action.payload.next || null
			})
			.addCase(getUsersProducts.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
			// SEARCH USERS PRODUCTS
			.addCase(searchUserProducts.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(searchUserProducts.fulfilled, (state, action) => {
				state.status = 'success'
				state.products = action.payload.results || action.payload
				state.next = action.payload.next || null
			})
			.addCase(searchUserProducts.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
			// UPDATE STATUS
			.addCase(updateProductStatus.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateProductStatus.fulfilled, (state, action) => {
				state.status = 'success'
				const prodFound = state.products.find((product) => product.idProd === action.payload.idProd)
				prodFound.statusPub = action.payload.statusPub
			})
			.addCase(updateProductStatus.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export default userProductsSlice.reducer
