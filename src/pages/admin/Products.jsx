import { useEffect, useState } from 'react'
import { getProductsListDB } from '../../services/usersProductsService'
import { PRODUCTS_API } from '../../utils/apiRoutes'
import TableProducts from '../../components/tables/TableProducts'
import TitleSection from '../../components/TitleSection'
import SectionDescription from '../../components/SectionDescription'
import Search from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import {
	getUsersProducts,
	searchUserProducts,
} from '../../app/features/usersProducts/userProductsSlice'
import BtnRefreshData from '../../components/BtnRefreshData'

const Products = () => {
	const productsState = useSelector((state) => state.usersProducts)
	const dispatch = useDispatch()

	useEffect(() => {
		getAllUsersProducts(productsState.endpoint)
	}, [])

	const getAllUsersProducts = (endpoint) => {
		dispatch(getUsersProducts(endpoint))
	}

	const restarData = () => {
		dispatch(getUsersProducts(`${PRODUCTS_API}/all`))
	}

	return (
		<div>
			<TitleSection title='Users products' />
			<section className='mb-16 w-full flex flex-col md:flex-row md:justify-between md:items-center gap-y-12'>
				<SectionDescription description='List of the Rent-ify team' />
				<Search searchFunction={searchUserProducts} />
			</section>

			<section className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-5'>
					<BtnRefreshData onrefresh={restarData} />
					{/* <UserFormFilter options={selectTeamStatusOptions} onchange={filterData} /> */}
				</div>
			</section>
			{productsState.status === 'success' && <TableProducts products={productsState.products} />}
		</div>
	)
}

export default Products
