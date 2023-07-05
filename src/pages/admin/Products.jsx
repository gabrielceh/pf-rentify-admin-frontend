import { useEffect } from 'react'
import { PRODUCTS_API } from '../../utils/apiRoutes'
import TableProducts from '../../components/tables/TableProducts'
import TitleSection from '../../components/TitleSection'
import SectionDescription from '../../components/SectionDescription'
import Search from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import {
	getProductNextList,
	getUsersProducts,
	searchUserProducts,
} from '../../app/features/usersProducts/userProductsSlice'
import BtnRefreshData from '../../components/BtnRefreshData'
import Loader from '../../components/Loader'

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

	const handleNext = () => {
		dispatch(getProductNextList(productsState.next))
	}

	return (
		<div>
			<TitleSection title='Users products' />
			<section className='mb-16 w-full flex flex-col md:flex-row md:justify-between md:items-center gap-y-12'>
				<SectionDescription description='List of products' />
				<Search searchFunction={searchUserProducts} />
			</section>

			<section className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-5'>
					<BtnRefreshData onrefresh={restarData} />
					{/* <UserFormFilter options={selectTeamStatusOptions} onchange={filterData} /> */}
				</div>
			</section>

			{productsState.status === 'loading' && (
				<div className='w-full h-[700px] grid place-content-center'>
					<Loader className='w-16 h-16 animate-spin' />
				</div>
			)}

			{productsState.status === 'success' && <TableProducts products={productsState.products} />}

			{productsState.next && productsState.status === 'success' ? (
				<div className='mt-6'>
					<button
						className='bg-dark_purple hover:bg-medium_purple text-white px-3 py-1 rounded-md'
						onClick={handleNext}>
						More
					</button>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default Products
