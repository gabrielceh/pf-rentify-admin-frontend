import { useContext, useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import { formatDate } from '../../utils/formatDate'
import { statusColors } from '../../utils/statusColors'
import { useModal } from '../../hooks/useModal'
import { copyText } from '../../utils/copyText'
import { ToastContext } from '../../context/ToastContext'
import { updateTeamRole, updateTeamtatus } from '../../app/features/team/teamSlice'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import EditModal from '../EditModal'
import CopyIcon from '../icons/CopyIcon'
import UserEditForm from '../users/UserEditForm'
import { useSelector } from 'react-redux'
import EditRolForm from '../team/EditRoleForm'
import { roleOptions, statusOptions } from '../../utils/selectsOptions'

/* eslint-disable react/prop-types */
const RowTeam = ({ user }) => {
	const [imgValid, setImgValid] = useState(false)
	const [date, setDate] = useState('')
	const [isOpenEditModal, openEditModal, closeEditModal] = useModal()
	const { addToast } = useContext(ToastContext)
	const userState = useSelector((state) => state.user)

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
				<td className='capitalize text-sm md:text-base'>
					{user.role === 'sudo' ? 'super' : user.role}
				</td>

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
							{userState.user.role === 'sudo' ? (
								<div className='w-full'>
									<UserEditForm
										idUser={user.idUser}
										status={user.status}
										options={statusOptions}
										updateFunc={updateTeamtatus}
									/>
									<EditRolForm
										idUser={user.idUser}
										role={user.role}
										updateFunc={updateTeamRole}
										options={roleOptions}
									/>
								</div>
							) : (
								<p className='text-danger font-bold'>You don&apos;t have permission</p>
							)}
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

export default RowTeam
