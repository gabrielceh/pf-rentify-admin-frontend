/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import CloseIcon from '../icons/CloseIcon'
import UserEditForm from './UserEditForm'

const UsersEditModal = ({ user, closeModal }) => {
	const [imgValid, setImgValid] = useState(false)

	const statusOptions = [
		{ label: 'Active', value: 'active' },
		{ label: 'Inactive', value: 'inactive' },
		{ label: 'Banned', value: 'banned' },
	]

	useEffect(() => {
		isImgValid(user.image, setImgValid)
	}, [user.image])

	return (
		<div className='fixed z-50 top-0 left-0 w-full min-h-screen p-4 py-16 md:p-16 overflow-hidden bg-modal_bg_25 backdrop-blur-md'>
			<div className='relative bg-white dark:bg-card_dark w-full max-w-[400px] h-[500px] mx-auto p-4 rounded-lg'>
				<button
					onClick={closeModal}
					className='absolute right-4 bg-dark_purple hover:bg-medium_purple px-2 py-1 rounded'>
					<CloseIcon className='stroke-white' />
				</button>
				<div className='w-10/12 mx-auto py-8 truncate flex flex-col items-center gap-3'>
					<img
						src={imgValid ? user.image : imgNotFound}
						alt={user.name}
						className='w-24 h-24 rounded-full'
					/>
					<h2 className='text-base'>ID: {user.idUser}</h2>
					<h3 className='text-xl truncate'>{user.name}</h3>
					<p className='text-gray_dark'>{user.email}</p>

					<UserEditForm idUser={user.idUser} status={user.status} options={statusOptions} />
				</div>
			</div>
		</div>
	)
}

export default UsersEditModal
