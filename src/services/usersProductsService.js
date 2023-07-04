import axios from 'axios'
import { PRODUCTS_API } from '../utils/apiRoutes'
import { getTokenConfig } from '../utils/tokenConfig'

export const getProductsListDB = async (url) => {
	const config = getTokenConfig()
	const { data } = await axios.get(url, config)
	console.log(data)
	return data
}

export const searchUserProduct = async (search) => {
	const config = getTokenConfig()

	const { data } = await axios.get(`${PRODUCTS_API}/all/?name=${search}`, config)
	return data
}

export const getUserProductByIdDB = async (idUser) => {
	const config = getTokenConfig()
	const { data } = await axios.get(`${PRODUCTS_API}/${idUser}`, config)

	return data
}

export const updateStatusProductDB = async ({ idProd, statusPub }) => {
	const config = getTokenConfig()
	console.log(idProd)
	await axios.put(`${PRODUCTS_API}/update-status`, { idProd, statusPub }, config)
}
