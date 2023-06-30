import { useContext, useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import { formatDate } from '../../utils/formatDate'
import { statusColors } from '../../utils/statusColors'
import { useModal } from '../../hooks/useModal'
import { ToastContext } from '../../context/ToastContext'
import { copyText } from '../../utils/copyText'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import EditModal from '../EditModal'
import CopyIcon from '../icons/CopyIcon'
import UserEditForm from '../users/UserEditForm'
import { updateUserStatus } from '../../app/features/users/usersSlice'

/* eslint-disable react/prop-types */
const RowUser = ({ user }) => {
	const [imgValid, setImgValid] = useState(false)
	const [date, setDate] = useState('')
	const [isOpenEditModal, openEditModal, closeEditModal] = useModal()
	const { addToast } = useContext(ToastContext)

	const statusOptions = [
		{ label: 'Active', value: 'active' },
		{ label: 'Inactive', value: 'inactive' },
		{ label: 'Banned', value: 'banned' },
	]

	useEffect(() => {
		isImgValid(user.image, setImgValid)
		setDate(formatDate(user.createdAt))
	}, [user])

	const handlyCopy = async () => {
		const text = `
ID: ${user.idUser},
Name: ${user.name},
Email: ${user.email},
Role: ${user.role},
Status: ${user.status},
Membership: ${user.membership},
Image: ${user.image},
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
				description: 'Comething bad happened',
				type: 'danger',
			})
		}
	}

	return (
		<>
			<tr className='shadow hover:bg-white dark:hover:bg-card_dark cursor-pointer'>
				<td className='py-4 pl-2 min-w-[150px] max-w-[200px] md:max-w-[250px] md:min-w-[200px] truncate'>
					<div className='flex items-center gap-3'>
						<img
							src={imgValid ? user.image : imgNotFound}
							alt={user.name}
							className='w-14 h-14 rounded-full'
						/>

						<div className='truncate'>
							<h4 className='text-xl capitalize truncate'>{user.name}</h4>
							<p className='text-sm md:text-base truncate'>{user.email}</p>
						</div>
					</div>
				</td>

				<td>
					<div className='flex items-center h-full text-sm md:text-base'>{date}</div>
				</td>
				<td className='capitalize text-sm md:text-base'>{user.membership}</td>
				<td>
					<span className={`capitalize text-xs px-2 py-1 rounded-md ${statusColors[user.status]}`}>
						{user.status}
					</span>
				</td>
				<td>
					<button
						className='bg-dark_purple text-white px-3 py-1 rounded-md hover:bg-medium_purple transition-colors'
						onClick={openEditModal}>
						Edit
					</button>
					{isOpenEditModal && (
						<EditModal user={user} closeModal={closeEditModal}>
							<UserEditForm
								idUser={user.idUser}
								status={user.status}
								options={statusOptions}
								updateFunc={updateUserStatus}
							/>
						</EditModal>
					)}
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

export default RowUser
