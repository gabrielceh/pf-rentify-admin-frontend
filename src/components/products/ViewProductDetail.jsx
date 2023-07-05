import { useEffect, useState } from 'react'
import { getUserProductByIdDB } from '../../services/usersProductsService'
import { isImgValid } from '../../utils/isImgValid'
import { formatDate } from '../../utils/formatDate'
import CloseIcon from '../icons/CloseIcon'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import Loader from '../Loader'
import { statusProductColors } from '../../utils/statusColors'
import DiamondIcon from '../icons/DiamondIcon'
import EditStatusProduct from './EditStatusProduct'
import { updateProductStatus } from '../../app/features/usersProducts/userProductsSlice'
import { statusProductOptions } from '../../utils/selectsOptions'

/* eslint-disable react/prop-types */
const ViewProductDetail = ({ idProd, onclose }) => {
	const [product, setProduct] = useState(null)
	const [status, setStatus] = useState('idle')
	const [owner, setOwner] = useState({})
	const [error, setError] = useState(null)
	const [imgValid, setImgValid] = useState(false)
	const [date, setDate] = useState('')

	const getProduct = async () => {
		setStatus('loading')
		try {
			const data = await getUserProductByIdDB(idProd)
			setProduct(data)
			isImgValid(data.image, setImgValid)
			setDate(formatDate(data.createdAt))
			setOwner({ ...data.users[0] })
			setStatus('success')
		} catch (err) {
			setError(err.response.data.error)
			setStatus('error')
		}
	}

	useEffect(() => {
		getProduct()

		return () => {
			setProduct(null)
			setImgValid(false)
			setDate('')
			setOwner({})
			setStatus('idle')
			setError(null)
		}
	}, [])

	return (
		<div className='relative w-full max-w-[500px] min-w-[340px] h-[575px] p-4 bg-white dark:bg-card_dark mx-auto rounded-lg  overflow-auto scrollbar-thin scrollbar-thumb-dark_purple scrollbar-thumb-rounded-md '>
			<button
				onClick={onclose}
				className='absolute right-4 bg-dark_purple hover:bg-medium_purple px-2 py-1 rounded'>
				<CloseIcon className='stroke-white' />
			</button>

			{status === 'loading' && (
				<div className='h-[400px] flex justify-center items-center '>
					<Loader className='w-16 h-16 animate-spin' />
				</div>
			)}

			{status === 'error' && <p className='text-danger text-xl'>{error}</p>}

			{status === 'success' && (
				<div className='w-10/12 mx-auto flex items-center flex-col gap-3'>
					<div className='relative'>
						<img
							src={imgValid ? product.image : imgNotFound}
							alt={product.name}
							className='w-24 h-24 rounded-full object-cover'
						/>
						{product.isFeatured && (
							<span className='absolute -top-[10%] -right-[10%] p-2 rounded-full bg-dark_purple shadow-md'>
								<DiamondIcon className='w-6 h-6 stroke-white' />
							</span>
						)}
					</div>
					<div className='w-full flex flex-col gap-2'>
						<h2 className='text-base'>ID: {product.idProd}</h2>
						<h3 className='text-xl'>{product.name}</h3>
						<p className='text-sm text-gray_dark'>Create at: {date}</p>
						<span
							className={`${
								statusProductColors[product.statusPub]
							} w-16 text-center px-2 py-1 rounded-md text-xs`}>
							{product.statusPub}
						</span>

						<details className='border-2 border-gray_dark px-3 py-2 rounded-md'>
							<summary className='font-bold'>Owner</summary>
							<p>
								Name: <span className='font-bold'>{owner.name}</span>
							</p>
							<p>
								Email: <span className='font-bold'>{owner.email}</span>
							</p>
						</details>

						<details className='border-2 border-gray_dark px-3 py-2 rounded-md'>
							<summary className='font-bold'>Location</summary>
							<p>Country: {product.country.name}</p>
							<p>Region: {product.state}</p>
							<p>City: {product.location}</p>
						</details>

						<details className='border-2 border-gray_dark px-3 py-2 rounded-md'>
							<summary className='font-bold'>Description</summary>
							<p className='text-gray_dark'>{product.description}</p>
						</details>
					</div>

					<EditStatusProduct
						idProd={product.idProd}
						options={statusProductOptions}
						dataToEdit={'statusPub'}
						status={product.statusPub}
						updateFunc={updateProductStatus}
					/>
				</div>
			)}
		</div>
	)
}

export default ViewProductDetail
