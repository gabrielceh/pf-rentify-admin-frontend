/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import { formatDate } from '../../utils/formatDate'
import { copyText } from '../../utils/copyText'
import { statusProductColors } from '../../utils/statusColors'
import { useModal } from '../../hooks/useModal'
import { ToastContext } from '../../context/ToastContext'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import CopyIcon from '../icons/CopyIcon'
import EyeOpenIcon from '../icons/EyeOpenIcon'
import Modal from '../Modal'
import ViewProductDetail from '../products/ViewProductDetail'

const RowProduct = ({ product }) => {
	const [imgValid, setImgValid] = useState(false)
	const [date, setDate] = useState('')
	const [isOpenView, openView, closeView] = useModal()
	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		isImgValid(product.image, setImgValid)
		setDate(formatDate(product.createdAt))
	}, [product])

	const handlyCopy = async () => {
		const text = `
ID: ${product.idProd},
Name: ${product.name},
description: ${product.description},
Price: ${product.price} ${product.country.currency.code}
Role: ${product.role},
statusPub: ${product.statusPub},
Image: ${product.image},
country:${product.country.name},
Region:${product.state},
City:${product.location},
Created_at: ${date},
			`
		const copied = await copyText(text)

		if (copied) {
			addToast({
				title: 'Copied',
				description: 'User copied',
				type: 'success',
			})
		} else {
			addToast({
				title: 'Error',
				description: 'Something bad happened',
				type: 'danger',
			})
		}
	}

	return (
		<>
			<tr className='shadow hover:bg-white dark:hover:bg-card_dark cursor-pointer'>
				<td className='py-4 pl-2 min-w-[150px] max-w-[200px] md:max-w-[250px] md:min-w-[200px] truncate'>
					<div className='flex items-center gap-3'>
						<div className='w-14 h14 rounded-full overflow-hidden'>
							<img
								src={imgValid ? product.image : imgNotFound}
								alt={product.name}
								className='w-14 h-14 rounded-full object-cover'
							/>
						</div>

						<div className='truncate'>
							<h4 className='text-xl capitalize truncate'>{product.name}</h4>
							<p className='text-sm md:text-base truncate'>ID:{product.idProd}</p>
						</div>
					</div>
				</td>

				<td>
					<div className='flex items-center h-full text-sm md:text-base'>
						<button
							className='bg-medium_purple text-white px-3 py-1 rounded-md hover:bg-dark_purple transition-colors'
							onClick={openView}>
							<EyeOpenIcon className='stroke-white w-6 h-6' />
						</button>
						{isOpenView && (
							<Modal>
								<ViewProductDetail idProd={product.idProd} onclose={closeView} />
							</Modal>
						)}
					</div>
				</td>

				<td>
					<span
						className={`capitalize text-xs px-2 py-1 rounded-md ${
							statusProductColors[product.statusPub]
						}`}>
						{product.statusPub}
					</span>
				</td>

				<td>
					<button
						className='bg-medium_purple text-white px-3 py-1 rounded-md hover:bg-dark_purple transition-colors'
						onClick={handlyCopy}>
						<CopyIcon className='stroke-white w-6 h-6' />
					</button>
				</td>
			</tr>
		</>
	)
}

export default RowProduct
